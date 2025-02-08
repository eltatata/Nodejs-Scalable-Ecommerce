import { Router } from 'express';
import { CheckoutRoutes } from './';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/payment', CheckoutRoutes.routes);

    return router;
  }
}
