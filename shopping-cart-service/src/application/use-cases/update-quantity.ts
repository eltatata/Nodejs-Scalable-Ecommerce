import { CartDataSource, CustomError, ProductDataSource } from '../../domain';

export interface UpdateQuantityUseCase {
  execute(userId: string, productId: string, quantity: number): Promise<void>;
}

export class UpdateQuantity implements UpdateQuantityUseCase {
  constructor(
    private cartDatasource: CartDataSource,
    private productDataSource: ProductDataSource,
  ) {}

  async execute(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    const cart = await this.cartDatasource.find(userId);
    if (!cart) throw CustomError.notFound('Cart not found');

    const item = cart.items.find((i) => i.productId === productId);
    if (!item) throw CustomError.notFound('Item not found');

    const response = await this.productDataSource.findProductById(productId);
    const product = await response.json();

    if (!product) throw CustomError.notFound('Product not found');

    if (quantity <= 0) {
      throw CustomError.badRequest('Quantity must be greater than 0');
    }

    if (quantity > product.inventory) {
      throw CustomError.badRequest('Quantity exceeds available inventory');
    }

    item.quantity = quantity;
    await this.cartDatasource.update(cart);
  }
}
