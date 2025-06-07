import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import {
  CheckoutDto,
  OrderRepository,
  StripeRepository,
  PaymentSuccessfulProducer,
} from '../../domain';
import { Checkout, Webhook } from '../../application';

export class CheckoutController {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly stripeRepository: StripeRepository,
    private readonly paymentSuccessfulProducer: PaymentSuccessfulProducer,
  ) {}

  checkout = (req: Request, res: Response) => {
    const data = {
      userId: req.params.userId,
      items: req.body.items,
    };

    const { errors, validatedData } = CheckoutDto.create(data);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new Checkout(this.orderRepository, this.stripeRepository)
      .execute(validatedData!)
      .then((data) => res.status(201).json(data))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  webhook = (req: Request, res: Response) => {
    new Webhook(
      this.orderRepository,
      this.stripeRepository,
      this.paymentSuccessfulProducer,
    )
      .execute(req)
      .then(() => res.status(200).send())
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };
}
