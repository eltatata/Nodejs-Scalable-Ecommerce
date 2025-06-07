import { Stripe } from 'stripe';
import { envs } from '../../config';
import { Item, StripeService } from '../../domain';

export class StripeServiceImpl implements StripeService {
  private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY);
  private readonly currency = envs.STRIPE_CURRENCY;

  async createCheckoutSession(
    items: Item[],
    orderId: string,
  ): Promise<string | null> {
    const { url } = await this.stripe.checkout.sessions.create({
      line_items: items.map(({ name, price, quantity }) => ({
        price_data: {
          currency: this.currency,
          product_data: {
            name,
          },
          unit_amount: Math.round(Number(price.toFixed(2)) * 100),
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
