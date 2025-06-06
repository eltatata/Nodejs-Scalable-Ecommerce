import {
  CategoryRepository,
  CreateProductDto,
  CustomError,
  ProductEntity,
  ProductRepository,
  StoreRepository,
} from '../../../domain';

export interface CreateProductUseCase {
  execute(createProductDto: CreateProductDto): Promise<ProductEntity>;
}

export class CreateProduct implements CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { images, ...productData } = createProductDto;

    const existingProduct = await this.productRepository.findByName(
      productData.name,
    );
    if (existingProduct) throw CustomError.conflict('Product already exists');

    const existingCategory = await this.categoryRepository.findById(
      productData.category,
    );
    if (!existingCategory) throw CustomError.notFound('Category not found');

    const imageInfo = await this.storeRepository.upload(images);

    return this.productRepository.create({ ...productData, images: imageInfo });
  }
}
