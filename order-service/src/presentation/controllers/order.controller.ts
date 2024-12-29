import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      res.status(201).json({ message: 'Order created' });
    } catch (error) {
      ErrorHandlerService.handleError(error, res);
    }
  }
}
