import { CustomError } from '../';

interface PaymentEntityProps {
  id: string;
  amount: number;
  paymentMethod: string;
}

export class PaymentEntity {
  constructor(
    public id: string,
    public amount: number,
    public paymentMethod: string,
  ) {}

  static fromObject(obj: unknown): PaymentEntity {
    const { id, amount, paymentMethod } = obj as PaymentEntityProps;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!amount) throw CustomError.badRequest('Missing amount');
    if (!paymentMethod) throw CustomError.badRequest('Missing paymentMethod');

    return new PaymentEntity(id, amount, paymentMethod);
  }
}
