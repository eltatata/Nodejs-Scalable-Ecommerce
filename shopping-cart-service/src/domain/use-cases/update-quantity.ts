import { ProductService } from "../../infrastructure";
import { CartDataSource } from "../datasources/cart.datasource";
import { CustomError } from "../errors/custom.error";

export interface UpdateQuantityUseCase {
  execute(userId: string, productId: string, quantity: number): Promise<void>;
}

export class UpdateQuantity implements UpdateQuantityUseCase {
  constructor(
    private cartDatasource: CartDataSource,
    private productService: ProductService = new ProductService()
  ) { }

  async execute(userId: string, productId: string, quantity: number): Promise<void> {
    const cart = await this.cartDatasource.find(userId);
    if (!cart) throw CustomError.notFound('Cart not found');

    const item = cart.items.find((i) => i.productId === productId);
    if (!item) throw CustomError.notFound('Item not found');

    const product = await this.productService.findProductById(productId);
    if (!product) throw CustomError.notFound('Product not found');

    if (quantity > product.inventory) {
      throw CustomError.badRequest('Quantity exceeds available inventory');
    }

    item.quantity = quantity;
    await this.cartDatasource.update(cart);
  }
}
