import { Item, ValidationResult } from '../..';
import { createOrderDtoSchema, ZodAdapter } from '../../../config';

interface CreateOrderDtoProps {
  userId: string;
  items: Item[];
  address: string;
}

export class CreateOrderDto {
  constructor(
    public userId: string,
    public items: Item[],
    public address: string,
  ) {}

  static create(props: CreateOrderDtoProps): ValidationResult<CreateOrderDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      createOrderDtoSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
