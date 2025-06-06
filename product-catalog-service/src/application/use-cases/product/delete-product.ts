import {
  CustomError,
  ProductEntity,
  ProductRepository,
  StoreRepository,
} from '../../../domain';

export interface DeleteProductUseCase {
  execute(id: string): Promise<ProductEntity>;
}

export class DeleteProduct implements DeleteProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async execute(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.delete(id);
    if (!product) throw CustomError.notFound('Product not found');

    await this.storeRepository.delete(product.images);

    return product;
  }
}
