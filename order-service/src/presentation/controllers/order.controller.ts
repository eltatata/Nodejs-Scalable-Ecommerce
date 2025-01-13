import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import {
  CreateOrder,
  CreateOrderDto,
  GetOrder,
  OrderRepository,
} from '../../domain';

export class OrderController {
  constructor(private readonly orderRepository: OrderRepository) {}

  createOrder = (req: Request, res: Response) => {
    const { userId } = req.params;
    const data = { ...req.body, userId };

    const { errors, validatedData } = CreateOrderDto.create(data);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new CreateOrder(this.orderRepository)
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
}
