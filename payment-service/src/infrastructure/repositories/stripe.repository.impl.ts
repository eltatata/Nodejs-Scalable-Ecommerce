import Stripe from 'stripe';
import { Item, StripeDataSource, StripeRepository } from '../../domain';

export class StripeRepositoryImpl implements StripeRepository {
  constructor(private readonly stripeDataSource: StripeDataSource) {}

  createCheckoutSession(
    items: Item[],
    orderId: string,
  ): Promise<string | null> {
    return this.stripeDataSource.createCheckoutSession(items, orderId);
  }

  constructEvent(body: Buffer, signature: string): Promise<Stripe.Event> {
    return this.stripeDataSource.constructEvent(body, signature);
  }
}
