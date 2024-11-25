import { Cart } from "../../data";
import { CartDataSource, CartEntity, Item } from "../../domain";

export class CartDataSourceImpl implements CartDataSource {
  async find(userId: string): Promise<CartEntity | null> {
    return Cart.findOne({ userId });
  }

  async create(userId: string, item: Item): Promise<CartEntity> {
    const cart = new Cart({ userId, items: [item] });
    await cart.save();
    return CartEntity.fromObject(cart);
  }
}
