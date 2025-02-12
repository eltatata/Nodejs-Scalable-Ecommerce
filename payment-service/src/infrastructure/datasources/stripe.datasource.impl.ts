import { Stripe } from 'stripe';
import { envs } from '../../config';
import { Item, StripeDataSource } from '../../domain';

export class StripeDataSourceImpl implements StripeDataSource {
  private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY);

  async createCheckoutSession(
    items: Item[],
    orderId: string,
  ): Promise<string | null> {
    const { url } = await this.stripe.checkout.sessions.create({
      line_items: items.map(({ name, price, quantity }) => ({
        price_data: {
          currency: 'cop',
          product_data: {
            name,
          },
          unit_amount: price * 100,
        },
        quantity,
      })),
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      metadata: {
        orderId: orderId,
      },
    });

    return url;
  }

  async constructEvent(body: Buffer, signature: string): Promise<Stripe.Event> {
    return this.stripe.webhooks.constructEvent(
      body,
      signature,
      envs.STRIPE_WEBHOOK_SECRET,
    );
  }
}
