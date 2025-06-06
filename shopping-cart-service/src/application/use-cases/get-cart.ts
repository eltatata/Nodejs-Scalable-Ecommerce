import { CartDataSource, CartEntity, CustomError } from '../../domain';

export interface GetCartUseCase {
  execute(userId: string): Promise<CartEntity>;
}

export class GetCart implements GetCartUseCase {
  constructor(private readonly cartDatasource: CartDataSource) {}

  async execute(userId: string): Promise<CartEntity> {
    const cart = await this.cartDatasource.find(userId);
    if (!cart) throw CustomError.notFound('Cart not found');

    return cart;
  }
}
