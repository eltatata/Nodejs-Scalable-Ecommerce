import { CartDataSource, CartEntity, CartRepository, Item } from '../../domain';

export class CartRepositoryImpl implements CartRepository {
  constructor(private readonly cartDataSource: CartDataSource) {}

  find(userId: string): Promise<CartEntity | null> {
    return this.cartDataSource.find(userId);
  }

  create(userId: string, item: Item): Promise<CartEntity> {
    return this.cartDataSource.create(userId, item);
  }

  update(cart: CartEntity): Promise<CartEntity | null> {
    return this.cartDataSource.update(cart);
  }
}
