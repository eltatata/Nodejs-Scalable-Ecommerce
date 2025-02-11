import { Request } from 'express';
import { Stripe } from 'stripe';
import { envs } from '../../config';
import { CustomError, OrderRepository } from '../';

export interface WebhookUseCase {
  execute(request: Request): Promise<void>;
}

export class Webhook implements WebhookUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY),
  ) {}

  async execute(request: Request): Promise<void> {
    const body = request.body;
    const signature = request.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        envs.STRIPE_WEBHOOK_SECRET,
      );
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
      console.log(
        `Payment for ${session?.metadata?.orderId} - ${session.amount_total} was successful. Shipping to ${addressString}`,
      );

      const response = await this.orderRepository.updateOrder(
        session?.metadata?.orderId as string,
        addressString,
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw CustomError.badRequest(error);
      }
    }
  }
}
