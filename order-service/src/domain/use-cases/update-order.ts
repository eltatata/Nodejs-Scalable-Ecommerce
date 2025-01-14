import { CustomError, OrderEntity, OrderRepository, UpdateOrderDto } from '../';

export interface UpdateOrderUseCase {
  execute(updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
}

export class UpdateOrder implements UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    const order = await this.orderRepository.getOrder(
      updateOrderDto.userId,
      updateOrderDto.id,
    );
    if (!order) throw CustomError.notFound('Order not found');

    return this.orderRepository.updateOrder(updateOrderDto);
  }
}
