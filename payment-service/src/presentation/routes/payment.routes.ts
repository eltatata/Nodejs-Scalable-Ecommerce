import { Router } from 'express';
import {
  PaymentDatasourceImpl,
  PaymentRepositoryImpl,
} from '../../infrastructure';
import { PaymentController } from '../';

export class PaymentRoutes {
  static get routes(): Router {
    const router = Router();

    const paymentDataSource = new PaymentDatasourceImpl();
    const paymenteRepository = new PaymentRepositoryImpl(paymentDataSource);
    const paymentController = new PaymentController(paymenteRepository);

    router.post('/', paymentController.createPayment);
    router.get('/:paymentId', paymentController.getPayment);

    return router;
  }
}
