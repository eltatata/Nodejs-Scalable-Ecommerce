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

  async getOrders(userId: string): Promise<OrderEntity[]> {
    const orders = await Order.find({ userId });
    return orders.map((order) => OrderEntity.fromObject(order));
  }

  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    const order = await Order.findByIdAndUpdate(
      updateOrderDto.id,
      { status: updateOrderDto.status },
      { new: true },
    );
    return OrderEntity.fromObject(order!);
  }

  deleteOrder(orderId: string): Promise<OrderEntity | null> {
    throw new Error('Method not implemented.');
  }
}
