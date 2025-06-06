import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import {
  CreateOrderDto,
  OrderRepository,
  ProductRepository,
  UpdateOrderDto,
} from '../../domain';
import { CreateOrder, GetOrder, UpdateOrder } from '../../application';

export class OrderController {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  createOrder = (req: Request, res: Response) => {
    const { errors, validatedData } = CreateOrderDto.create(req.body);

    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new CreateOrder(this.orderRepository, this.productRepository)
      .execute(validatedData!)
      .then((order) => res.status(201).json(order))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  getOrder = (req: Request, res: Response) => {
    const { userId, orderId } = req.params;

    new GetOrder(this.orderRepository)
      .execute(userId, orderId)
      .then((order) => res.status(200).json(order))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  getOrders = (req: Request, res: Response) => {
    const { userId } = req.params;

    this.orderRepository
      .getOrders(userId)
      .then((orders) => res.status(200).json(orders))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  updateOrder = (req: Request, res: Response) => {
    const { orderId } = req.params;
    const data = { ...req.body, id: orderId };

    const { errors, validatedData } = UpdateOrderDto.update(data);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new UpdateOrder(this.orderRepository)
      .execute(validatedData!)
      .then((order) => res.status(200).json(order))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };
}
