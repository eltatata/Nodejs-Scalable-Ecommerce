import { CloudinaryStorageService } from "../../../presentation";
import { CreateProductDto, CustomError, ProductEntity, ProductRepository } from "../../";

export interface CreateProductUseCase {
  execute(createProductDto: CreateProductDto): Promise<ProductEntity>;
}

export class CreateProduct implements CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cloudinaryStorageService: CloudinaryStorageService = new CloudinaryStorageService()
  ) { }

  async execute(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { images, ...productData } = createProductDto;

    const existingProduct = await this.productRepository.findByName(productData.name);
    if (existingProduct) throw CustomError.conflict('Product already exists');

    const imageInfo = await this.cloudinaryStorageService.upload(images);

    return this.productRepository.create({ ...productData, images: imageInfo });
  }
}
