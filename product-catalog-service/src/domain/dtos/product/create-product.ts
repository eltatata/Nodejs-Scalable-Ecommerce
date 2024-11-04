import { ValidationResult } from '../../';
import { createProductSchema, ZodAdapter } from '../../../config';

export class CreateProductDto {
  private constructor(
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public inventory: number,
    public images: Buffer[],
  ) { }

  static create(props: Record<string, any>): ValidationResult<CreateProductDto> {
    const { errors, validatedData } = ZodAdapter.validate(createProductSchema, props);

    return errors ? { errors } : { validatedData };
  }
}
