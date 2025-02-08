import { Router } from 'express';
import { CheckoutController } from '../';
import {
  OrderDataSourceImpl,
  OrderRepositoryImpl,
} from '../../infrastructure/';

export class PaymentRoutes {
  static get routes(): Router {
    const router = Router();

    const orderDataSource = new OrderDataSourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDataSource);
    const checkoutController = new CheckoutController(orderRepository);

    router.post('/checkout', checkoutController.checkout);

    return router;
  }
}
