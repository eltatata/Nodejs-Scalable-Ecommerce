import { CreateOrderDto, UpdateOrderDto, OrderEntity } from '../';

export abstract class OrderRepository {
  abstract createOrder(order: CreateOrderDto): Promise<OrderEntity>;
  abstract getOrder(
    userId: string,
    orderId: string,
  ): Promise<OrderEntity | null>;
  abstract getOrders(): Promise<OrderEntity[]>;
  abstract updateOrder(order: UpdateOrderDto): Promise<OrderEntity | null>;
  abstract deleteOrder(orderId: string): Promise<OrderEntity | null>;
}
