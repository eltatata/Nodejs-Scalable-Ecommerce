import { CartDataSource, CustomError } from '../../domain';

export interface ClearCartUseCase {
  execute(userId: string): Promise<void>;
}

export class ClearCart implements ClearCartUseCase {
  constructor(private cartDatasource: CartDataSource) {}

  async execute(userId: string): Promise<void> {
    const cart = await this.cartDatasource.find(userId);
    if (!cart) throw CustomError.notFound('Cart not found');

    cart.items = [];

    await this.cartDatasource.update(cart);
  }
}
