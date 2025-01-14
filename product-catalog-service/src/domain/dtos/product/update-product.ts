import { ValidationResult } from '../../';
import { updateProductSchema, ZodAdapter } from '../../../config';

interface UpdateProductDtoProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  images: Buffer[];
}

export class UpdateProductDto {
  private constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public inventory: number,
    public images: Buffer[],
  ) {}

  static update(
    props: UpdateProductDtoProps,
  ): ValidationResult<UpdateProductDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      updateProductSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
