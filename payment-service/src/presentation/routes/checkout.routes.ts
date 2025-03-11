import express, { Router } from 'express';
import { CheckoutController } from '../';
import {
  OrderDataSourceImpl,
  OrderRepositoryImpl,
  StripeDataSourceImpl,
  StripeRepositoryImpl,
  KafkaDataSourceImpl,
  KafkaRepositoryImpl,
} from '../../infrastructure/';

export class CheckoutRoutes {
  static get routes(): Router {
    const router = Router();

    const orderDataSource = new OrderDataSourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDataSource);

    const stripeDataSource = new StripeDataSourceImpl();
    const stripeRepository = new StripeRepositoryImpl(stripeDataSource);

    const kafkaDataSource = new KafkaDataSourceImpl();
    const kafkaRepository = new KafkaRepositoryImpl(kafkaDataSource);

    const checkoutController = new CheckoutController(
      orderRepository,
      stripeRepository,
      kafkaRepository,
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
