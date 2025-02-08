import { CustomError, Item } from '../';

interface OrderEntityProps {
  id: string;
  userId: string;
  items: Item[];
  totalAmount: number;
  status: string;
  address?: string;
  createdAt: string | Date;
}

export class OrderEntity {
  constructor(
    public id: string,
    public userId: string,
    public items: Item[],
    public totalAmount: number,
    public status: string,
    public createdAt: Date,
    public address?: string,
  ) {}

  static fromObject(obj: unknown): OrderEntity {
    const { id, userId, items, totalAmount, status, address, createdAt } =
      obj as OrderEntityProps;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!userId) throw CustomError.badRequest('Missing userId');
    if (!items) throw CustomError.badRequest('Missing items');
    if (!totalAmount) throw CustomError.badRequest('Missing totalAmount');
    if (!status) throw CustomError.badRequest('Missing status');
    if (!createdAt) throw CustomError.badRequest('Missing createdAt');

    return new OrderEntity(
      id,
      userId,
      items,
      totalAmount,
      status,
      new Date(createdAt),
      address,
    );
  }
}
