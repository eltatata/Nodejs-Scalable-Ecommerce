import { ProductService } from "../../infrastructure";
import { CartDataSource, CartEntity, CustomError, Item } from "../";

export interface AddItemUseCase {
  execute(userId: string, item: Item): Promise<CartEntity | null>;
}

export class AddItem implements AddItemUseCase {
  constructor(
    private cartDataSource: CartDataSource,
    private productService: ProductService = new ProductService()
  ) {}

  async execute(userId: string, item: Item): Promise<CartEntity | null> {
    const product = await this.productService.findProductById(item.productId);
    
    const existingCart = await this.cartDataSource.find(userId);
    if (!existingCart) throw CustomError.notFound("Cart not found");

    return existingCart;
  }
}