import { Stripe } from 'stripe';
import { envs } from '../../config';
import { CheckoutDto, CustomError, Order, OrderRepository } from '../';

interface CheckoutResponse {
  url: string;
  order: Order;
}

export interface CheckoutUseCase {
  execute(CheckoutDto: CheckoutDto): Promise<CheckoutResponse>;
}

export class Checkout implements CheckoutUseCase {
  constructor(
    private readonly orderRespository: OrderRepository,
    private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY),
  ) {}

  async execute(checkoutDto: CheckoutDto): Promise<CheckoutResponse> {
    const response = await this.orderRespository.createOrder(checkoutDto);

    if (!response.ok) {
      const { error } = await response.json();
      throw CustomError.badRequest(error);
    }

    const { url } = await this.stripe.checkout.sessions.create({
      line_items: checkoutDto.items.map((item) => ({
        price_data: {
          currency: 'cop',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    if (!url) {
      throw CustomError.internalServer('Error creating payment session');
    }

    return {
      url,
      order: await response.json(),
    };
  }
}
