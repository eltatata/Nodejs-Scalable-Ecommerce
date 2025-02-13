import { ProductDataSource, ProductRepository } from '../../domain';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDataSource: ProductDataSource) {}

  findProductById(id: string): Promise<Response> {
    return this.productDataSource.findProductById(id);
  }

  deductProduct(id: string, quantity: number): Promise<Response> {
    return this.productDataSource.deductProduct(id, quantity);
  }
}
