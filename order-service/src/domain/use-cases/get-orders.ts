import { OrderRepository, OrderEntity } from '../';

export interface GetOrdersUseCase {
  execute(userId: string): Promise<OrderEntity[]>;
}

export class GetOrders implements GetOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(userId: string): Promise<OrderEntity[]> {
    return await this.orderRepository.getOrders(userId);
  }
}
