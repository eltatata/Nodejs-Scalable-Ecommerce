import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import {
  CreatePayment,
  CreatePaymentDto,
  GetPayment,
  PaymentRepository,
} from '../../domain';

export class PaymentController {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  createPayment = (req: Request, res: Response) => {
    const data = {
      orderId: req.body.orderId,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
    };

    console.log('data', data);

    const { errors, validatedData } = CreatePaymentDto.create(data);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new CreatePayment(this.paymentRepository)
      .execute(validatedData!)
      .then((payment) => res.status(201).json(payment))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  getPayment = (req: Request, res: Response) => {
    const paymentId = req.params.paymentId;

    new GetPayment(this.paymentRepository)
      .execute(paymentId)
      .then((payment) => res.status(200).json(payment))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };
}
