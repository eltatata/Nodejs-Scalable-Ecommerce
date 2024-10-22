import { regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly password: string,
  ) { }

  static create(obj: any): [string?, RegisterUserDto?] {
    const { name, lastname, email, password } = obj;

    if (!name) return ['Missing name', undefined];
    if (!lastname) return ['Missing lastname', undefined];
    if (!regularExps.email.test(email)) return ['Invalid email', undefined];
    if (!password || password.length < 6) return ['Password must be at least 6 characters long', undefined];

    return [undefined, new RegisterUserDto(name, lastname, email, password)];
  }
}