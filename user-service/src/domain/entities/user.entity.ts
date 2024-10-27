import { CustomError } from "../";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastname: string,
    public email: string,
    public role: string,
    public address?: string,
    public phone?: string,
  ) { }

  static fromObject(obj: any): UserEntity {
    const { id, _id, name, lastname, email, role, address, phone } = obj;

    if (!id && !_id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!lastname) throw CustomError.badRequest('Missing lastname');
    if (!email) throw CustomError.badRequest('Missing email');
    if (!role) throw CustomError.badRequest('Missing role');

    return new UserEntity(id || _id, name, lastname, email, role, address, phone);
  }
}
