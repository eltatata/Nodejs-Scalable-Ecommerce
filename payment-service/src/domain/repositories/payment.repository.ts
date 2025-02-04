import { CreatePaymentDto, PaymentEntity } from '../';

export abstract class PaymentRepository {
  abstract createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity>;
  abstract getPaymentById(paymentId: string): Promise<PaymentEntity | null>;
}
