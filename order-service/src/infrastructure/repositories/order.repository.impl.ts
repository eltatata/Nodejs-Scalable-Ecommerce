import {
  CreateOrderDto,
  OrderEntity,
  OrderRepository,
  UpdateOrderDto,
} from '../../domain';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly orderDataSource: OrderRepository) {}

  createOrder(order: CreateOrderDto): Promise<OrderEntity> {
    return this.orderDataSource.createOrder(order);
  }

  getOrder(userId: string, orderId: string): Promise<OrderEntity | null> {
    return this.orderDataSource.getOrder(userId, orderId);
  }

  getOrders(): Promise<OrderEntity[]> {
    throw new Error('Method not implemented.');
  }

  updateOrder(order: UpdateOrderDto): Promise<OrderEntity | null> {
    throw new Error('Method not implemented.');
  }

  deleteOrder(orderId: string): Promise<OrderEntity | null> {
    throw new Error('Method not implemented.');
  }
}
