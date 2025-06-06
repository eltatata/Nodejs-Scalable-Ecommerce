import { OrderRepository, OrderEntity, CustomError } from '../../domain';

export interface GetOrderUseCase {
  execute(userId: string, orderId: string): Promise<OrderEntity>;
}

export class GetOrder implements GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(userId: string, orderId: string): Promise<OrderEntity> {
    const order = await this.orderRepository.getOrder(userId, orderId);
    if (!order) throw CustomError.notFound('Order not found');

    return order;
  }
}
