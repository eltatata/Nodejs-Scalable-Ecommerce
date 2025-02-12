import express, { Router } from 'express';
import { CheckoutController } from '../';
import {
  OrderDataSourceImpl,
  OrderRepositoryImpl,
  StripeDataSourceImpl,
  StripeRepositoryImpl,
} from '../../infrastructure/';

export class CheckoutRoutes {
  static get routes(): Router {
    const router = Router();

    const stripeDataSource = new StripeDataSourceImpl();
    const stripeRepository = new StripeRepositoryImpl(stripeDataSource);

    const orderDataSource = new OrderDataSourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDataSource);

    const checkoutController = new CheckoutController(
      orderRepository,
      stripeRepository,
    );

    router.post('/checkout', checkoutController.checkout);
    router.post(
      '/webhook',
      express.raw({ type: 'application/json' }),
      checkoutController.webhook,
    );

    return router;
  }
}
