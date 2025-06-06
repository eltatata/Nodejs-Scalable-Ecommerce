import {
  CartDataSource,
  CartEntity,
  CustomError,
  Item,
  ProductDataSource,
} from '../../domain';

export interface AddItemUseCase {
  execute(userId: string, item: Item): Promise<CartEntity>;
}

export class AddItem implements AddItemUseCase {
  constructor(
    private cartDataSource: CartDataSource,
    private productDataSource: ProductDataSource,
  ) {}

  async execute(userId: string, item: Item): Promise<CartEntity> {
    const response = await this.productDataSource.findProductById(
      item.productId,
    );

    if (!response.ok) {
      throw CustomError.notFound('Product not found');
    }

    const product = await response.json();

    if (item.quantity <= 0) {
      throw CustomError.badRequest('Quantity must be greater than 0');
    }

    if (item.quantity > product.inventory) {
      throw CustomError.badRequest('Quantity exceeds available inventory');
    }

    let cart = await this.cartDataSource.find(userId);
    if (!cart) {
      cart = await this.cartDataSource.create(userId, {
        ...item,
        name: product.name,
        price: product.price,
      });
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
        name: product.name,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const updatedCart = await this.cartDataSource.update(cart);
    if (!updatedCart) {
      throw CustomError.internalServer('Failed to add item to cart');
    }
    return updatedCart;
  }
}
