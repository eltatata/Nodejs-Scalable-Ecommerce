import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '../';

export abstract class CategoryRepository {
  abstract find(): Promise<CategoryEntity[]>;
  abstract findById(id: string): Promise<CategoryEntity | null>;
  abstract findByName(name: string): Promise<CategoryEntity | null>;
  abstract create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity>;
  abstract update(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity | null>;
  abstract delete(id: string): Promise<CategoryEntity | null>;
}
