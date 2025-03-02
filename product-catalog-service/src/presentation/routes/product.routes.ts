import { Router } from 'express';
import {
  CategoryDataSourceImpl,
  CategoryRepositoryImpl,
  FilesMiddleware,
  ProductDataSourceImpl,
  ProductRepositoryImpl,
  StoreDataSourceImpl,
  StoreRepositoryImpl,
} from '../../infrastructure';
import { ProductController } from '../';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const storeDataSource = new StoreDataSourceImpl();
    const storeRepository = new StoreRepositoryImpl(storeDataSource);

    const categoryDataSource = new CategoryDataSourceImpl();
    const categoryRepository = new CategoryRepositoryImpl(categoryDataSource);

    const productDataSource = new ProductDataSourceImpl();
    const productRepository = new ProductRepositoryImpl(productDataSource);

    const productController = new ProductController(
      productRepository,
      categoryRepository,
      storeRepository,
    );

    router.get('/', productController.findProducts);
    router.get('/:id', productController.findProduct);
    router.post(
      '/',
      FilesMiddleware.upload.array('images', 5),
      productController.createProduct,
    );
    router.put(
      '/:id',
      FilesMiddleware.upload.array('images', 5),
      productController.updateProduct,
    );
    router.patch('/:id/deduct', productController.deductProduct);
    router.delete('/:id', productController.deleteProduct);

    return router;
  }
}
