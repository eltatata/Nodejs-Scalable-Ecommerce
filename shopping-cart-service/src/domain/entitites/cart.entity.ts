import { CustomError, Item } from '../';

interface CartEntityProps {
  id: string;
  userId: string;
  items: Item[];
  createdAt: Date;
  updatedAt: Date;
}

export class CartEntity {
  constructor(
    public id: string,
    public userId: string,
    public items: Item[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromObject(obj: unknown): CartEntity {
    const { id, userId, items, createdAt, updatedAt } = obj as CartEntityProps;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!userId) throw CustomError.badRequest('Missing userId');
    if (!items) throw CustomError.badRequest('Missing items');
    if (!createdAt) throw CustomError.badRequest('Missing createdAt');
    if (!updatedAt) throw CustomError.badRequest('Missing updatedAt');

    return new CartEntity(
      id,
      userId,
      items,
      new Date(createdAt),
      new Date(updatedAt),
    );
  }
}
