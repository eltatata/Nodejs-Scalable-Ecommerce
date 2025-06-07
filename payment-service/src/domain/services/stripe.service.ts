import { Stripe } from 'stripe';
import { Item } from '../../domain';

export interface StripeService {
  createCheckoutSession(items: Item[], orderId: string): Promise<string | null>;
  constructEvent(body: Buffer, signature: string): Promise<Stripe.Event>;
}
