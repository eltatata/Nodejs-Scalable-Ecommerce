import { Router } from 'express';
import { CategoryRoutes } from './';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/category', CategoryRoutes.routes);

    return router;
  }
}
