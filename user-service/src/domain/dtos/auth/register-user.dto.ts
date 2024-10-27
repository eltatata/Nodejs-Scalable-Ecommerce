import { ValidationResult } from '../../';
import { registerUserSchema, ZodAdapter } from '../../../config';

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly password: string,
  ) { }

  static create(props: Record<string, any>): ValidationResult<RegisterUserDto> {
    const { errors, validatedData } = ZodAdapter.validate(registerUserSchema, props);

    return errors ? { errors } : { validatedData };
  }
}
