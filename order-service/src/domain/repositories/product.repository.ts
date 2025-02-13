export abstract class ProductRepository {
  abstract findProductById(id: string): Promise<Response>;
  abstract deductProduct(id: string, quantity: number): Promise<Response>;
}
