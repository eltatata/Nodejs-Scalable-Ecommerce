import { CreatePaymentDto, PaymentEntity } from '../';

export abstract class PaymentDataSource {
  abstract createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity>;
  abstract getPaymentById(paymentId: string): Promise<PaymentEntity | null>;
}
