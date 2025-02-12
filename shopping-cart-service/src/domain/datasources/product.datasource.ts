export abstract class ProductDataSource {
  abstract findProductById(id: string): Promise<Response>;
}
