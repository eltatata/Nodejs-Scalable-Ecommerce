import { PaymentEntity, CreatePaymentDto, PaymentRepository } from '../';

export interface CreatePaymentUseCase {
  execute(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity>;
}

export class CreatePayment implements CreatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
    const paymentMock = {
      orderId: createPaymentDto.orderId,
      amount: createPaymentDto.amount,
      status: 'pending',
      paymentMethod: createPaymentDto.paymentMethod,
    };

    return this.paymentRepository.createPayment(paymentMock);
  }
}
