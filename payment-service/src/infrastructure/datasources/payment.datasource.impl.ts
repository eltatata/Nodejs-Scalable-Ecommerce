import { Payment } from '../../data';
import {
  CreatePaymentData,
  PaymentDataSource,
  PaymentEntity,
} from '../../domain';

export class PaymentDatasourceImpl implements PaymentDataSource {
  async createPayment(
    createPaymentData: CreatePaymentData,
  ): Promise<PaymentEntity> {
    const payment = new Payment({
      orderId: createPaymentData.orderId,
      amount: createPaymentData.amount,
      status: createPaymentData.status,
      paymentMethod: createPaymentData.paymentMethod,
    });
    await payment.save();
    return PaymentEntity.fromObject(payment);
  }

  async getPaymentById(paymentId: string): Promise<PaymentEntity | null> {
    const payment = await Payment.findById(paymentId);
    return payment ? PaymentEntity.fromObject(payment) : null;
  }
}
