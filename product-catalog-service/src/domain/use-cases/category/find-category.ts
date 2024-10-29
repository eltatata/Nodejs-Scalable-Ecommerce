import { CategoryEntity, CategoryRepository, CustomError } from "../../";

export interface FindCategoryUseCase {
  execute(id: string): Promise<CategoryEntity>;
}

export class FindCategory implements FindCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw CustomError.notFound('Category not found');

    return category;
  }
}
