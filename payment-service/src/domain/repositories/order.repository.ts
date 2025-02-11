import { CheckoutDto } from '../';

export abstract class OrderRepository {
  abstract createOrder(checkoutDto: CheckoutDto): Promise<Response>;
  abstract updateOrder(orderId: string, address: string): Promise<Response>;
}
