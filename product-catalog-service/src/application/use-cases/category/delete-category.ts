import {
  CategoryEntity,
  CategoryRepository,
  CustomError,
} from '../../../domain';

export interface DeleteCategoryUseCase {
  execute(id: string): Promise<CategoryEntity>;
}

export class DeleteCategory implements DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.delete(id);
    if (!category) throw CustomError.notFound('Category not found');
    return category;
  }
}
