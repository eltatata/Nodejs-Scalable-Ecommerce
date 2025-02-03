import { Cart } from '../../data';
import { CartDataSource, CartEntity, Item } from '../../domain';

export class CartDataSourceImpl implements CartDataSource {
  async find(userId: string): Promise<CartEntity | null> {
    const cart = await Cart.findOne({ userId });
    return cart ? CartEntity.fromObject(cart) : null;
  }

  async create(userId: string, item: Item): Promise<CartEntity> {
    const cart = new Cart({ userId, items: [item] });
    await cart.save();
    return CartEntity.fromObject(cart);
  }

  async update(cart: CartEntity): Promise<CartEntity | null> {
    const updatedCart = await Cart.findByIdAndUpdate(cart.id, cart, {
      new: true,
    });
    return updatedCart ? CartEntity.fromObject(updatedCart) : null;
  }
}
