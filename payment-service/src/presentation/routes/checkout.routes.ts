import express, { Router } from 'express';
import { CheckoutController } from '../';
import {
  OrderDataSourceImpl,
  OrderRepositoryImpl,
  StripeDataSourceImpl,
  StripeRepositoryImpl,
  PaymentSuccessfulProducerImpl,
} from '../../infrastructure/';

export class CheckoutRoutes {
  static get routes(): Router {
    const router = Router();

    const paymentSuccessfulProducer = new PaymentSuccessfulProducerImpl();

    const orderDataSource = new OrderDataSourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDataSource);

    const stripeDataSource = new StripeDataSourceImpl();
    const stripeRepository = new StripeRepositoryImpl(stripeDataSource);

    const checkoutController = new CheckoutController(
      orderRepository,
      stripeRepository,
      paymentSuccessfulProducer,
    );

    router.post('/:userId/checkout', checkoutController.checkout);
    router.post(
      '/webhook',
      express.raw({ type: 'application/json' }),
      checkoutController.webhook,
    );

    return router;
  }
}
