import { Router } from 'express';
import {
  OrderDatasourceImpl,
  OrderRepositoryImpl,
  ProductDataSourceImpl,
  ProductRepositoryImpl,
} from '../../infrastructure';
import { OrderController } from '../';

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();

    const productDataSource = new ProductDataSourceImpl();
    const productRepository = new ProductRepositoryImpl(productDataSource);

    const orderDataSource = new OrderDatasourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDataSource);

    const orderController = new OrderController(
      orderRepository,
      productRepository,
    );

    router.post('/', orderController.createOrder);
    router.get('/:userId/:orderId', orderController.getOrder);
    router.get('/:userId', orderController.getOrders);
    router.put('/:orderId', orderController.updateOrder);

    return router;
  }
}
