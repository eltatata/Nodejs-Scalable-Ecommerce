import { CreatePaymentData, PaymentEntity } from '../';

export abstract class PaymentDataSource {
  abstract createPayment(
    createPaymentData: CreatePaymentData,
  ): Promise<PaymentEntity>;
  abstract getPaymentById(paymentId: string): Promise<PaymentEntity | null>;
}
