import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import { CreateOrder, CreateOrderDto, OrderRepository } from '../../domain';

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
}
