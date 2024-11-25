import { CartEntity, Item } from "../";

export abstract class CartRepository {
  abstract find(userId: string): Promise<CartEntity | null>;
  abstract create(userId: string, item: Item): Promise<CartEntity>;
}
