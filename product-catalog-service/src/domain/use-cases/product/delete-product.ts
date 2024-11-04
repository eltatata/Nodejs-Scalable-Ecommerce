import { CloudinaryStorageService } from "../../../presentation";
import { CustomError, ProductEntity, ProductRepository } from "../../";

export interface DeleteProductUseCase {
  execute(id: string): Promise<ProductEntity>;
}

export class DeleteProduct implements DeleteProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cloudinaryStorageService: CloudinaryStorageService = new CloudinaryStorageService()
  ) { }

  async execute(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.delete(id);
    if (!product) throw CustomError.notFound('Product not found');

    await this.cloudinaryStorageService.delete(product.images);

    return product;
  }
}
