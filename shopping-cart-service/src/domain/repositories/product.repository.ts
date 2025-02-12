export abstract class ProductRepository {
  abstract findProductById(id: string): Promise<Response>;
}
