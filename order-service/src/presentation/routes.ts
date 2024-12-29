import { Router } from 'express';
import { OrderRoutes } from './';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/order', OrderRoutes.routes);

    return router;
  }
}
