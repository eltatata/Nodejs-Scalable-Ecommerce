import { CheckoutDto, CustomError } from '..';
import { Stripe } from 'stripe';
import { envs } from '../../config';

export interface CheckoutUseCase {
  execute(CheckoutDto: CheckoutDto): Promise<{ url: string }>;
}

export class Checkout implements CheckoutUseCase {
  constructor(private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY)) {}

  async execute(checkoutDto: CheckoutDto): Promise<{ url: string }> {
    const session = await this.stripe.checkout.sessions.create({
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

    if (!session.url) {
      throw CustomError.internalServer('Error creating payment session');
    }

    return { url: session.url };
  }
}
