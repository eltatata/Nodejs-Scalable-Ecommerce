import { Router } from 'express';
import { CartRoutes } from './';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/cart', CartRoutes.routes);

    return router;
  }
}
