import { Router } from 'express';
import { CategoryRoutes, ProductRoutes } from './';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/category', CategoryRoutes.routes);
    router.use('/api/product', ProductRoutes.routes);

    return router;
  }
}
