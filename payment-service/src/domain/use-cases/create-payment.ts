import { PaymentEntity, CreatePaymentDto, PaymentRepository } from '../';
import { Stripe } from 'stripe';
import { envs } from '../../config';

export interface CreatePaymentUseCase {
  execute(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity>;
}

export class CreatePayment implements CreatePaymentUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY),
  ) {}

  async execute(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'cop',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: createPaymentDto.amount * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'cop',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: createPaymentDto.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    console.log(session.url);

    const paymentMock = {
      orderId: createPaymentDto.orderId,
      amount: createPaymentDto.amount,
      status: 'pending',
      paymentMethod: createPaymentDto.paymentMethod,
    };

    return this.paymentRepository.createPayment(paymentMock);
  }
}
