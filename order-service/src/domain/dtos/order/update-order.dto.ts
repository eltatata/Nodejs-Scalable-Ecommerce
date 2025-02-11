import { ValidationResult } from '../..';
import { updateOrderDtoSchema, ZodAdapter } from '../../../config';

export class UpdateOrderDto {
  constructor(
    public id: string,
    public status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered',
    public address: string,
  ) {}

  static update(props: {
    id: string;
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered';
  }): ValidationResult<UpdateOrderDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      updateOrderDtoSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
