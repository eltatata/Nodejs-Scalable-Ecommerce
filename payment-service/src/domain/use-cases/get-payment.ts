import { PaymentEntity, PaymentRepository, CustomError } from '../';

export interface GetPaymentUseCase {
  execute(paymentId: string): Promise<PaymentEntity>;
}

export class GetPayment implements GetPaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(paymentId: string): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.getPaymentById(paymentId);
    if (!payment) throw CustomError.notFound('Payment not found');

    return payment;
  }
}
