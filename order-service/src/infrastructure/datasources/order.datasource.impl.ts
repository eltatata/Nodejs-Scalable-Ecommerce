import { Order } from '../../data';
import {
  CreateOrderData,
  OrderDataSource,
  OrderEntity,
  UpdateOrderDto,
} from '../../domain/';

export class OrderDatasourceImpl implements OrderDataSource {
  async createOrder(createOrderData: CreateOrderData): Promise<OrderEntity> {
    const order = new Order(createOrderData);
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

  async updateOrder(
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity | null> {
    const order = await Order.findByIdAndUpdate(
      updateOrderDto.id,
      { status: updateOrderDto.status, address: updateOrderDto.address },
      { new: true },
    );
    return order ? OrderEntity.fromObject(order) : null;
  }
}
