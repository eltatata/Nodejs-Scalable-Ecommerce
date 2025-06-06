import { CartDataSource, CustomError } from '../../domain';

export interface DeleteItemUseCase {
  execute(userId: string, productId: string): Promise<void>;
}

export class DeleteItem implements DeleteItemUseCase {
  constructor(private cartDataSource: CartDataSource) {}

  async execute(userId: string, productId: string): Promise<void> {
    const cart = await this.cartDataSource.find(userId);
    if (!cart) throw CustomError.notFound('Cart not found');

    const itemIndex = cart.items.findIndex((i) => i.productId === productId);
    if (itemIndex === -1) throw CustomError.notFound('Item not found in cart');

    cart.items.splice(itemIndex, 1);

    await this.cartDataSource.update(cart);
  }
}
