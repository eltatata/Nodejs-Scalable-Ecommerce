import {
  CreatePaymentDto,
  PaymentDataSource,
  PaymentEntity,
  PaymentRepository,
} from '../../domain';

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly paymentDataSource: PaymentDataSource) {}

  createPayment(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity> {
    return this.paymentDataSource.createPayment(createPaymentDto);
  }

  getPaymentById(paymentId: string): Promise<PaymentEntity | null> {
    return this.paymentDataSource.getPaymentById(paymentId);
  }
}
