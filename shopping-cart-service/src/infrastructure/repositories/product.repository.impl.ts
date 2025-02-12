import { ProductDataSource, ProductRepository } from '../../domain';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDataSource: ProductDataSource) {}

  async findProductById(id: string): Promise<Response> {
    return this.productDataSource.findProductById(id);
  }
}
