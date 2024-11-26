import { ProductService } from "../../infrastructure";
import { CartDataSource, CartEntity, CustomError, Item } from "../";

export interface AddItemUseCase {
  execute(userId: string, item: Item): Promise<CartEntity | null>;
}

export class AddItem implements AddItemUseCase {
  constructor(
    private cartDataSource: CartDataSource,
    private productService: ProductService = new ProductService()
  ) { }

  async execute(userId: string, item: Item): Promise<CartEntity | null> {
    const product = await this.productService.findProductById(item.productId);
    if (!product) throw CustomError.notFound('Product not found');

    if (item.quantity > product.inventory) {
      throw CustomError.badRequest('Quantity exceeds available inventory');
    }

    let cart = await this.cartDataSource.find(userId);
    if (!cart) {
      cart = await this.cartDataSource.create(userId, { ...item, price: product.price });
      return cart;
    }

    const existingItem = cart.items.find((i) => i.productId === item.productId);
    if (existingItem) {
      if (existingItem.quantity + item.quantity > product.inventory) {
        throw CustomError.badRequest('Quantity exceeds available inventory');
      }
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    return this.cartDataSource.update(cart);
  }
}
