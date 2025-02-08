import { Router } from 'express';
import { CheckoutController } from '../';
import {
  OrderDataSourceImpl,
  OrderRepositoryImpl,
} from '../../infrastructure/';

export class CheckoutRoutes {
  static get routes(): Router {
    const router = Router();

    const orderDataSource = new OrderDataSourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDataSource);
    const checkoutController = new CheckoutController(orderRepository);

    router.post('/checkout', checkoutController.checkout);

    return router;
  }
}
