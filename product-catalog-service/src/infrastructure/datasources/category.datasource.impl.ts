import { Category } from '../../data';
import {
  CategoryDataSource,
  CategoryEntity,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../domain';

export class CategoryDataSourceImpl implements CategoryDataSource {
  async find(): Promise<CategoryEntity[]> {
    const categories = await Category.find();
    return categories.map((category) => CategoryEntity.fromObject(category));
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await Category.findById(id);
    return category ? CategoryEntity.fromObject(category) : null;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = await Category.findOne({ name });
    return category ? CategoryEntity.fromObject(category) : null;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = new Category(createCategoryDto);
    await category.save();
    return CategoryEntity.fromObject(category);
  }

  async update(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity | null> {
    const updatedCategory = await Category.findByIdAndUpdate(
      updateCategoryDto.id,
      updateCategoryDto,
      { new: true },
    );
    return updatedCategory ? CategoryEntity.fromObject(updatedCategory) : null;
  }

  async delete(id: string): Promise<CategoryEntity | null> {
    const category = await Category.findByIdAndDelete(id);
    return category ? CategoryEntity.fromObject(category) : null;
  }
}
