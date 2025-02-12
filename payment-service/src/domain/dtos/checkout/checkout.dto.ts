import { checkoutSchema, ZodAdapter } from '../../../config';
import { Item, ValidationResult } from '../../';

interface CheckoutDtoProps {
  userId: string;
  items: Item[];
}

export class CheckoutDto {
  private constructor(
    public readonly items: Item[],
    public readonly userId: string,
  ) {}

  static create(props: CheckoutDtoProps): ValidationResult<CheckoutDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      checkoutSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
