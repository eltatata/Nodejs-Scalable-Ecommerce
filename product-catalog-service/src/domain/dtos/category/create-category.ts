import { ValidationResult } from '../../';
import { createCategorySchema, ZodAdapter } from '../../../config';

export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly description?: string,
  ) {}

  static create(props: {
    name: string;
    description?: string;
  }): ValidationResult<CreateCategoryDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      createCategorySchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
