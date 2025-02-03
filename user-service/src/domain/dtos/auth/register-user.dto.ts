import { ValidationResult } from '../../';
import { registerUserSchema, ZodAdapter } from '../../../config';

interface RegisterUserDtoProps {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(
    props: RegisterUserDtoProps,
  ): ValidationResult<RegisterUserDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      registerUserSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
