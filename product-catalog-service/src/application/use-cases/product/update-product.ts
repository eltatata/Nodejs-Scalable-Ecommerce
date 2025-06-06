import {
  CustomError,
  ProductEntity,
  ProductRepository,
  UpdateProductDto,
  StoreRepository,
  CategoryRepository,
} from '../../../domain';

export interface UpdateProductUseCase {
  execute(updateProductDto: UpdateProductDto): Promise<ProductEntity>;
}

export class UpdateProduct implements UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async execute(updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const currentProduct = await this.productRepository.findById(
      updateProductDto.id,
    );
    if (!currentProduct) throw CustomError.notFound('Product not found');

    const existingCategory = await this.categoryRepository.findById(
      updateProductDto.category,
    );
    if (!existingCategory) throw CustomError.notFound('Category not found');

    if (
      updateProductDto.name &&
      updateProductDto.name !== currentProduct.name
    ) {
      const existingProduct = await this.productRepository.findByName(
        updateProductDto.name,
      );
      if (existingProduct) throw CustomError.conflict('Product already exists');
    }

    let updatedImages = currentProduct.images;
    if (updateProductDto.images) {
      if (currentProduct.images.length + updateProductDto.images.length > 5) {
        throw CustomError.badRequest('Maximum of 5 images allowed');
      }

      const imageInfo = await this.storeRepository.upload(
        updateProductDto.images,
      );

      updatedImages = [...currentProduct.images, ...imageInfo];
    }

    const updatedProduct = await this.productRepository.update({
      ...updateProductDto,
      images: updatedImages,
    });
    if (!updatedProduct) throw CustomError.notFound('Failed to update product');

    return updatedProduct;
  }
}
