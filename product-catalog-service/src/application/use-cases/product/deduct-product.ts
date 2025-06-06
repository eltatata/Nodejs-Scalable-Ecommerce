import { CustomError, ProductEntity, ProductRepository } from '../../../domain';

export interface DeductProductUseCase {
  execute(id: string, quantity: number): Promise<ProductEntity>;
}

export class DeductProduct implements DeductProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, quantity: number): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) throw CustomError.notFound('Product not found');

    if (!quantity || quantity <= 0) {
      throw CustomError.badRequest('Invalid quantity');
    }
    if (quantity > product.inventory) {
      throw CustomError.badRequest('Insufficient inventory');
    }

    const updatedProduct = await this.productRepository.update({
      ...product,
      inventory: product.inventory - quantity,
    });
    if (!updatedProduct) throw CustomError.notFound('Failed to update product');

    return updatedProduct;
  }
}
