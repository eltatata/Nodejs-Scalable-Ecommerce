import { Router } from 'express';
import { OrderController } from '../';

export class OrderRoutes {
  static get routes() {
    const router = Router();

    router.post('/create', OrderController.createOrder);

    return router;
  }
}
