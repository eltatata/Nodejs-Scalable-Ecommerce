import { Router } from 'express';
import { AuthRoutes, UserRoutes } from './';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/user', UserRoutes.routes);

    return router;
  }
}
