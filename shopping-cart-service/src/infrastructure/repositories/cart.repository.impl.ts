import { CartDataSource, CartEntity, CartRepository, Item } from "../../domain";

export class CartRepositoryImpl implements CartRepository {
  constructor(private readonly cartDataSource: CartDataSource) { }

  async find(userId: string): Promise<CartEntity | null> {
    return this.cartDataSource.find(userId);
  }

  async create(userId: string, item: Item): Promise<CartEntity> {
    return this.cartDataSource.create(userId, item);
  }

  async update(cart: CartEntity): Promise<CartEntity> {
    return this.cartDataSource.update(cart);
  }
}
