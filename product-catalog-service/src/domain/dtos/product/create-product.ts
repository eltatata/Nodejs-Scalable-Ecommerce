import { ValidationResult } from '../../';
import { createProductSchema, ZodAdapter } from '../../../config';

interface CreateProductDtoProps {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  images: Buffer[];
}

export class CreateProductDto {
  private constructor(
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public inventory: number,
    public images: Buffer[],
  ) {}

  static create(
    props: CreateProductDtoProps,
  ): ValidationResult<CreateProductDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      createProductSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
