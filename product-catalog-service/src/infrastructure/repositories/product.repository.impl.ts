import {
  CreateProductData,
  UpdateProductData,
  ProductDataSource,
  ProductEntity,
  ProductRepository,
} from '../../domain';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDatasource: ProductDataSource) {}

  find(): Promise<ProductEntity[]> {
    return this.productDatasource.find();
  }

  findById(id: string): Promise<ProductEntity | null> {
    return this.productDatasource.findById(id);
  }

  findByName(name: string): Promise<ProductEntity | null> {
    return this.productDatasource.findByName(name);
  }

  create(createProductData: CreateProductData): Promise<ProductEntity> {
    return this.productDatasource.create(createProductData);
  }

  update(updateProductData: UpdateProductData): Promise<ProductEntity | null> {
    return this.productDatasource.update(updateProductData);
  }

  delete(id: string): Promise<ProductEntity | null> {
    return this.productDatasource.delete(id);
  }
}
