import { CreateProductData, UpdateProductData, ProductEntity } from '../';

export abstract class ProductDataSource {
  abstract find(): Promise<ProductEntity[]>;
  abstract findById(id: string): Promise<ProductEntity | null>;
  abstract findByName(name: string): Promise<ProductEntity | null>;
  abstract create(createProductData: CreateProductData): Promise<ProductEntity>;
  abstract update(
    updateProductData: UpdateProductData,
  ): Promise<ProductEntity | null>;
  abstract delete(id: string): Promise<ProductEntity | null>;
}
