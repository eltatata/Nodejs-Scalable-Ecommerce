import { Router } from 'express';
import {
  CategoryDataSourceImpl,
  CategoryRepositoryImpl,
} from '../../infrastructure';
import { CategoryController } from '../';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryDataSource = new CategoryDataSourceImpl();
    const categoryRepository = new CategoryRepositoryImpl(categoryDataSource);
    const categoryController = new CategoryController(categoryRepository);

    router.get('/', categoryController.findCategories);
    router.get('/:id', categoryController.findCategory);
    router.post('/', categoryController.createCategory);
    router.put('/:id', categoryController.updateCategory);
    router.delete('/:id', categoryController.deleteCategory);

    return router;
  }
}
