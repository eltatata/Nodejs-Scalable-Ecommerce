import { Router } from 'express';
import {
  FilesMiddleware,
  ProductDataSourceImpl,
  ProductRepositoryImpl,
} from '../../infrastructure';
import { ProductController } from '../';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const productDataSource = new ProductDataSourceImpl();
    const productRepository = new ProductRepositoryImpl(productDataSource);
    const productController = new ProductController(productRepository);

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
