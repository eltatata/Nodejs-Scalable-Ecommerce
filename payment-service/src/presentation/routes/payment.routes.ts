import { Router } from 'express';
import { CheckoutController } from '../';

export class PaymentRoutes {
  static get routes(): Router {
    const router = Router();

    const checkoutController = new CheckoutController();

    router.post('/checkout', checkoutController.checkout);

    return router;
  }
}
