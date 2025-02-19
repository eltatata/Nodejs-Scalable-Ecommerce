import { CustomError } from '../';

interface UserEntityProps {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password?: string;
  address?: string;
  phone?: string;
}

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastname: string,
    public email: string,
    public role: string,
    public password?: string,
    public address?: string,
    public phone?: string,
  ) {}

  static fromObject(obj: unknown): UserEntity {
    const { id, name, lastname, email, password, role, address, phone } =
      obj as UserEntityProps;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!lastname) throw CustomError.badRequest('Missing lastname');
    if (!email) throw CustomError.badRequest('Missing email');
    if (!role) throw CustomError.badRequest('Missing role');

    return new UserEntity(
      id,
      name,
      lastname,
      email,
      role,
      password,
      address,
      phone,
    );
  }
}
