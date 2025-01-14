import {
  CategoryDataSource,
  CategoryEntity,
  CategoryRepository,
} from '../../domain';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDataSource) {}

  find(): Promise<CategoryEntity[]> {
    return this.categoryDatasource.find();
  }

  findById(id: string): Promise<CategoryEntity | null> {
    return this.categoryDatasource.findById(id);
  }

  findByName(name: string): Promise<CategoryEntity | null> {
    return this.categoryDatasource.findByName(name);
  }

  create(category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryDatasource.create(category);
  }

  update(category: CategoryEntity): Promise<CategoryEntity | null> {
    return this.categoryDatasource.update(category);
  }

  delete(id: string): Promise<CategoryEntity | null> {
    return this.categoryDatasource.delete(id);
  }
}
