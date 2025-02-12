import { Router } from 'express';
import {
  CartDataSourceImpl,
  CartRepositoryImpl,
  ProductDataSourceImpl,
  ProductRepositoryImpl,
} from '../../infrastructure';
import { CartController } from '../';

export class CartRoutes {
  static get routes(): Router {
    const router = Router();

    const productDataSource = new ProductDataSourceImpl();
    const productRepository = new ProductRepositoryImpl(productDataSource);

    const cartDataSource = new CartDataSourceImpl();
    const cartRepository = new CartRepositoryImpl(cartDataSource);

    const cartController = new CartController(
      cartRepository,
      productRepository,
    );

    router.post('/:userId', cartController.addItem);
    router.get('/:userId', cartController.getCart);
    router.put('/:userId/:productId', cartController.updateQuantity);
    router.delete('/:userId/:productId', cartController.deleteItem);
    router.delete('/:userId', cartController.clearCart);

    return router;
  }
}
