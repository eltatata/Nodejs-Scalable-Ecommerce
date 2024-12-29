import { Item, ValidationResult } from '../..';
import { createOrderDtoSchema, ZodAdapter } from '../../../config';

export class CreateOrderDto {
  constructor(
    public userId: string,
    public items: Item[],
    public totalAmount: number,
    public address: string,
  ) {}

  static create(props: {
    userId: string;
    items: Item[];
    totalAmount: number;
    address: string;
  }): ValidationResult<CreateOrderDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      createOrderDtoSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
