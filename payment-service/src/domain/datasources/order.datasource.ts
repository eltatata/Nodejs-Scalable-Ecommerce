import { CheckoutDto } from '../';

export abstract class OrderDataSource {
  abstract createOrder(checkoutDto: CheckoutDto): Promise<Response>;
  abstract updateOrder(orderId: string, address: string): Promise<Response>;
}
