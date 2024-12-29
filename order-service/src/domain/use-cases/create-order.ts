import { CreateOrderDto, OrderEntity, OrderRepository } from '../';

export interface CreateOrderUseCase {
  execute(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
}

export class CreateOrder implements CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderRepository.createOrder(createOrderDto);
  }
}
