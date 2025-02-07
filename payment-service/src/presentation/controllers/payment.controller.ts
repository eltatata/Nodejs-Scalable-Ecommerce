import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import { Checkout, CheckoutDto } from '../../domain';

export class CheckoutController {
  constructor() {}

  checkout = (req: Request, res: Response) => {
    const data = {
      orderId: req.body.orderId,
      items: req.body.items,
    };

    const { errors, validatedData } = CheckoutDto.create(data);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new Checkout()
      .execute(validatedData!)
      .then((payment) => res.status(201).json(payment))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };
}
