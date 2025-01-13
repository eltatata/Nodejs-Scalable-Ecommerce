import { Order } from '../../data';
import {
  CreateOrderDto,
  OrderDataSource,
  OrderEntity,
  UpdateOrderDto,
} from '../../domain/';

export class OrderDatasourceImpl implements OrderDataSource {
  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = new Order(createOrderDto);
    await order.save();
    return OrderEntity.fromObject(order);
  }

  async getOrder(userId: string, orderId: string): Promise<OrderEntity | null> {
    const order = await Order.findOne({ _id: orderId, userId });
    return order ? OrderEntity.fromObject(order) : null;
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
