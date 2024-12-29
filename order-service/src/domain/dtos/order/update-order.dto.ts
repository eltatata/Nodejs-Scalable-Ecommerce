import { ValidationResult } from '../..';
import { updateOrderDtoSchema, ZodAdapter } from '../../../config';

export class UpdateOrderDto {
  constructor(
    public status:
      | 'pending'
      | 'processing'
      | 'shipped'
      | 'delivered'
      | 'cancelled',
  ) {}

  static create(props: {
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  }): ValidationResult<UpdateOrderDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      updateOrderDtoSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
