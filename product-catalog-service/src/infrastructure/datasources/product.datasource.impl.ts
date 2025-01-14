import { Product } from '../../data';
import {
  CreateProductData,
  UpdateProductData,
  ProductDataSource,
  ProductEntity,
} from '../../domain';

export class ProductDataSourceImpl implements ProductDataSource {
  async find(): Promise<ProductEntity[]> {
    const products = await Product.find();
    return products.map((product) => ProductEntity.fromObject(product));
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await Product.findById(id);
    return product ? ProductEntity.fromObject(product) : null;
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const product = await Product.findOne({ name });
    return product ? ProductEntity.fromObject(product) : null;
  }

  async create(createProductData: CreateProductData): Promise<ProductEntity> {
    const product = new Product(createProductData);
    await product.save();
    return ProductEntity.fromObject(product);
  }

  async update(
    updateProductDto: UpdateProductData,
  ): Promise<ProductEntity | null> {
    const updatedProduct = await Product.findByIdAndUpdate(
      updateProductDto.id,
      updateProductDto,
      { new: true },
    );
    return updatedProduct ? ProductEntity.fromObject(updatedProduct) : null;
  }

  async delete(id: string): Promise<ProductEntity | null> {
    const product = await Product.findByIdAndDelete(id);
    return product ? ProductEntity.fromObject(product) : null;
  }
}
