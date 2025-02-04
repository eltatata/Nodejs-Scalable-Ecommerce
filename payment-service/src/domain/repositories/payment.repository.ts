import { createPaymentData, PaymentEntity } from '../';

export abstract class PaymentRepository {
  abstract createPayment(
    createPaymentData: createPaymentData,
  ): Promise<PaymentEntity>;
  abstract getPaymentById(paymentId: string): Promise<PaymentEntity | null>;
}
