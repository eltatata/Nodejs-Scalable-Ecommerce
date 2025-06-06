import {
  CategoryEntity,
  CategoryRepository,
  CustomError,
  UpdateCategoryDto,
} from '../../../domain';

export interface UpdateCategoryUseCase {
  execute(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity>;
}

export class UpdateCategory implements UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const currentCategory = await this.categoryRepository.findById(
      updateCategoryDto.id,
    );
    if (!currentCategory) throw CustomError.notFound('Category not found');

    if (
      updateCategoryDto.name === currentCategory.name &&
      updateCategoryDto.description === currentCategory.description
    ) {
      throw CustomError.conflict('No changes detected');
    }

    if (
      updateCategoryDto.name &&
      updateCategoryDto.name !== currentCategory.name
    ) {
      const existingCategory = await this.categoryRepository.findByName(
        updateCategoryDto.name,
      );
      if (existingCategory)
        throw CustomError.conflict('Category already exists');
    }

    const updatedCategory =
      await this.categoryRepository.update(updateCategoryDto);
    if (!updatedCategory)
      throw CustomError.notFound('Failed to update category');

    return updatedCategory;
  }
}
