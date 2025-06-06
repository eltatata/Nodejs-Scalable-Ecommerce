import { ProductEntity, ProductRepository } from '../../../domain';

export interface FindProductsUseCase {
  execute(): Promise<ProductEntity[]>;
}

export class FindProducts implements FindProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
}
