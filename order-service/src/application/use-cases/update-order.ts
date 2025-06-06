import {
  CustomError,
  OrderEntity,
  OrderRepository,
  UpdateOrderDto,
} from '../../domain';

export interface UpdateOrderUseCase {
  execute(updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
}

export class UpdateOrder implements UpdateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    const updatedOrder = await this.orderRepository.updateOrder(updateOrderDto);
    if (!updatedOrder) throw CustomError.notFound('Order not found');
    return updatedOrder;
  }
}
