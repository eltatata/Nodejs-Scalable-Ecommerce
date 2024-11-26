import { envs } from "../../config";
import { Product } from "../../domain";

export class ProductService {
  async findProductById(id: string): Promise<Product | null> {
    const response = await fetch(`${envs.PRODUCTS_API_URL}/${id}`);

    if (!response.ok) return null;

    const product = await response.json();
    return product;
  }
}
