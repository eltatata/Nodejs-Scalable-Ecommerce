import {
  CategoryEntity,
  CategoryRepository,
  CreateCategoryDto,
  CustomError,
} from '../../../domain';

export interface CreateCategoryUseCase {
  execute(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
}

export class CreateCategory implements CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const existingCategory = await this.categoryRepository.findByName(
      createCategoryDto.name,
    );
    if (existingCategory) throw CustomError.conflict('Category already exists');

    return this.categoryRepository.create(createCategoryDto);
  }
}
