import { ValidationResult } from '../../';
import { loginUserSchema, ZodAdapter } from '../../../config';

interface LoginUserDtoProps {
  email: string;
  password: string;
}

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(props: LoginUserDtoProps): ValidationResult<LoginUserDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      loginUserSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
