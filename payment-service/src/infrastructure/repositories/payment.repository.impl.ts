import {
  createPaymentData,
  PaymentDataSource,
  PaymentEntity,
  PaymentRepository,
} from '../../domain';

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly paymentDataSource: PaymentDataSource) {}

  createPayment(createPaymentData: createPaymentData): Promise<PaymentEntity> {
    return this.paymentDataSource.createPayment(createPaymentData);
  }

  getPaymentById(paymentId: string): Promise<PaymentEntity | null> {
    return this.paymentDataSource.getPaymentById(paymentId);
  }
}
