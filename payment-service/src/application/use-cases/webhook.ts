import { Request } from 'express';
import { Stripe } from 'stripe';
import {
  CustomError,
  OrderRepository,
  StripeService,
  PaymentSuccessfulProducer,
} from '../../domain';

export interface WebhookUseCase {
  execute(request: Request): Promise<void>;
}

export class Webhook implements WebhookUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly stripeService: StripeService,
    private readonly paymentSuccessfulProducer: PaymentSuccessfulProducer,
  ) {}

  async execute(request: Request): Promise<void> {
    const body = request.body;
    const signature = request.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = await this.stripeService.constructEvent(body, signature);
    } catch (err) {
      console.error(err);
      throw CustomError.badRequest('Webhook Error');
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];

    const addressString = addressComponents
      .filter((c) => c !== null)
      .join(', ');

    if (event.type === 'checkout.session.completed') {
      const response = await this.orderRepository.updateOrder(
        session?.metadata?.orderId as string,
        addressString,
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw CustomError.badRequest(error);
      }

      const paymentSuccessfulEvent = {
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
        orderId: session?.metadata?.orderId,
        invoicedAmount: session?.amount_total,
        paymentMethod: session?.payment_method_types?.[0],
        address: addressString,
      };

      await this.paymentSuccessfulProducer.sendPaymentSuccessfulEvent(
        paymentSuccessfulEvent,
      );
    }
  }
}
