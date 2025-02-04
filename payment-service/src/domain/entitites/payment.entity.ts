import { CustomError } from '../';

interface PaymentEntityProps {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  paymentMethod: string;
}

export class PaymentEntity {
  constructor(
    public id: string,
    public orderId: string,
    public amount: number,
    public status: string,
    public paymentMethod: string,
  ) {}

  static fromObject(obj: unknown): PaymentEntity {
    const { id, orderId, amount, status, paymentMethod } =
      obj as PaymentEntityProps;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!amount) throw CustomError.badRequest('Missing amount');
    if (!paymentMethod) throw CustomError.badRequest('Missing paymentMethod');

    return new PaymentEntity(id, orderId, amount, status, paymentMethod);
  }
}
