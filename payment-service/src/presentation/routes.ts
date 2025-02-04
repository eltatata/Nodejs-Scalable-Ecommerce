import { Router } from 'express';
import { PaymentRoutes } from './';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/payment', PaymentRoutes.routes);

    return router;
  }
}
