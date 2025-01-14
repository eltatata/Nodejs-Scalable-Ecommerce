import { Router } from 'express';
import { OrderDatasourceImpl, OrderRepositoryImpl } from '../../infrastructure';
import { OrderController } from '../';

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();

    const orderDataSource = new OrderDatasourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDataSource);
    const orderController = new OrderController(orderRepository);

    router.post('/:userId', orderController.createOrder);
    router.get('/:userId/:orderId', orderController.getOrder);
    router.get('/:userId', orderController.getOrders);
    router.put('/:userId/:orderId', orderController.updateOrder);

    return router;
  }
}
