import { regularExps } from "../../../config";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) { }

  static create(obj: any): [string?, LoginUserDto?] {
    const { email, password } = obj;

    if (!regularExps.email.test(email)) return ['Invalid email', undefined];
    if (!password || password.length < 6) return ['Password must be at least 6 characters long', undefined];

    return [undefined, new LoginUserDto(email, password)];
  }
}
