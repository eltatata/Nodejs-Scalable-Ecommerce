import { CustomError, ProductEntity, ProductRepository } from '../../../domain';

export interface FindProductUseCase {
  execute(id: string): Promise<ProductEntity>;
}

export class FindProduct implements FindProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) throw CustomError.notFound('Product not found');

    return product;
  }
}
