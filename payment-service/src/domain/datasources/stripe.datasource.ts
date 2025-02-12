import Stripe from 'stripe';
import { Item } from '../';

export abstract class StripeDataSource {
  abstract createCheckoutSession(
    items: Item[],
    orderId: string,
  ): Promise<string | null>;
  abstract constructEvent(
    body: Buffer,
    signature: string,
  ): Promise<Stripe.Event>;
}
