import { CheckoutDto, OrderDataSource, OrderRepository } from '../../domain';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly orderDataSource: OrderDataSource) {}

  createOrder(checkoutDto: CheckoutDto): Promise<Response> {
    return this.orderDataSource.createOrder(checkoutDto);
  }

  updateOrder(orderId: string, address: string): Promise<Response> {
    return this.orderDataSource.updateOrder(orderId, address);
  }
}
