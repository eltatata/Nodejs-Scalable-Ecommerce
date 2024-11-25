import { envs } from "../../config";
import { CustomError, Product } from "../../domain";

export class ProductService {
  async findProductById(id: string): Promise<Product> {
    try {
      const response = await fetch(`${envs.PRODUCTS_API_URL}/${id}`);
      if (!response.ok) throw CustomError.notFound("Product not found");
      
      const product: Product = await response.json();
      return product;
    } catch (error: any) {
      throw CustomError.internalServer(error.message);
    }
  }
}
