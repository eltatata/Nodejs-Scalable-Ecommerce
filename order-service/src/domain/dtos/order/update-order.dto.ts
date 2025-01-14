import { ValidationResult } from '../..';
import { updateOrderDtoSchema, ZodAdapter } from '../../../config';

export class UpdateOrderDto {
  constructor(
    public id: string,
    public userId: string,
    public status:
      | 'pending'
      | 'processing'
      | 'shipped'
      | 'delivered'
      | 'cancelled',
  ) {}

  static update(props: {
    id: string;
    userId: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  }): ValidationResult<UpdateOrderDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      updateOrderDtoSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
