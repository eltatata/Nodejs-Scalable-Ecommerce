import { CreateOrderData, UpdateOrderDto, OrderEntity } from '../';

export abstract class OrderRepository {
  abstract createOrder(createOrderData: CreateOrderData): Promise<OrderEntity>;
  abstract getOrder(
    userId: string,
    orderId: string,
  ): Promise<OrderEntity | null>;
  abstract getOrders(userId: string): Promise<OrderEntity[]>;
  abstract updateOrder(
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity | null>;
}
