import {
  CreateOrderData,
  OrderDataSource,
  OrderEntity,
  OrderRepository,
  UpdateOrderDto,
} from '../../domain';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly orderDataSource: OrderDataSource) {}

  createOrder(createOrderData: CreateOrderData): Promise<OrderEntity> {
    return this.orderDataSource.createOrder(createOrderData);
  }

  getOrder(userId: string, orderId: string): Promise<OrderEntity | null> {
    return this.orderDataSource.getOrder(userId, orderId);
  }

  getOrders(userId: string): Promise<OrderEntity[]> {
    return this.orderDataSource.getOrders(userId);
  }

  updateOrder(updateOrderDto: UpdateOrderDto): Promise<OrderEntity | null> {
    return this.orderDataSource.updateOrder(updateOrderDto);
  }
}
