import { Document } from "mongoose";
import { CustomError } from "../";

export class CartEntity extends Document {
  constructor(
    public id: string,
    public userId: string,
    public items: { productId: string, quantity: number }[],
    public createdAt: Date,
    public updatedAt: Date
  ) {
    super();
  }

  static fromObject(obj: any): CartEntity {
    const { id, _id, userId, items, createdAt, updatedAt } = obj;

    if (!id && _id) throw CustomError.badRequest("Missing id");
    if (!userId) throw CustomError.badRequest("Missing userId");
    if (!items) throw CustomError.badRequest("Missing items");
    if (!createdAt) throw CustomError.badRequest("Missing createdAt");
    if (!updatedAt) throw CustomError.badRequest("Missing updatedAt");

    return new CartEntity(id || _id, userId, items, new Date(createdAt), new Date(updatedAt));;
  }
}
