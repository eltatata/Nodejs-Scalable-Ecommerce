import { Router } from 'express';
import { EmailRoutes } from './routes/email.routes';

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/notification', EmailRoutes.routes);

    return router;
  }
}
