import { ValidationResult } from '../../interfaces/validation.interfaces';
import { createPaymentSchema, ZodAdapter } from '../../../config';

interface CreatePaymentDtoProps {
  orderId: string;
  amount: number;
  paymentMethod: string;
}

export class CreatePaymentDto {
  private constructor(
    public readonly orderId: string,
    public readonly amount: number,
    public readonly paymentMethod: string,
  ) {}

  static create(
    props: CreatePaymentDtoProps,
  ): ValidationResult<CreatePaymentDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      createPaymentSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
