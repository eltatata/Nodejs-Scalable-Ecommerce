import { CategoryEntity, CategoryRepository } from '../..';

export interface FindCategoriesUseCase {
  execute(): Promise<CategoryEntity[]>;
}

export class FindCategories implements FindCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
