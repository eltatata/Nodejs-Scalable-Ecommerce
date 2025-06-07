import express, { Router } from 'express';
import { CheckoutController } from '../';
import {
  OrderDataSourceImpl,
  OrderRepositoryImpl,
  StripeServiceImpl,
  PaymentSuccessfulProducerImpl,
} from '../../infrastructure/';

export class CheckoutRoutes {
  static get routes(): Router {
    const router = Router();

    const stripeService = new StripeServiceImpl();

    const paymentSuccessfulProducer = new PaymentSuccessfulProducerImpl();

    const orderDataSource = new OrderDataSourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDataSource);

    const checkoutController = new CheckoutController(
      orderRepository,
      stripeService,
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
