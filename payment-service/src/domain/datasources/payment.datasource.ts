import { createPaymentData, PaymentEntity } from '../';

export abstract class PaymentDataSource {
  abstract createPayment(
    createPaymentData: createPaymentData,
  ): Promise<PaymentEntity>;
  abstract getPaymentById(paymentId: string): Promise<PaymentEntity | null>;
}
