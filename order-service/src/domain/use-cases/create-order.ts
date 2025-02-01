import { ProductService } from '../../infrastructure';
import { CustomError, CreateOrderDto, OrderEntity, OrderRepository } from '../';

export interface CreateOrderUseCase {
  execute(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
}

export class CreateOrder implements CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private productService: ProductService = new ProductService(),
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const reviewedProducts = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productService.findProductById(
          item.productId,
        );

        if (
          !product ||
          product.inventory < item.quantity ||
          product.price !== item.price
        ) {
          return false;
        }

        return product;
      }),
    );

    if (reviewedProducts.includes(false)) {
      throw CustomError.badRequest('Some products are not available');
    }

    const totalAmount = createOrderDto.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const order = await this.orderRepository.createOrder({
      ...createOrderDto,
      totalAmount,
    });

    await Promise.all(
      createOrderDto.items.map(async (item) => {
        await this.productService.deductProduct(item.productId, item.quantity);
      }),
    );

    return order;
  }
}
