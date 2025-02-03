import { CartEntity, Item } from '../';

export abstract class CartDataSource {
  abstract find(userId: string): Promise<CartEntity | null>;
  abstract create(userId: string, item: Item): Promise<CartEntity>;
  abstract update(cart: CartEntity): Promise<CartEntity | null>;
}
