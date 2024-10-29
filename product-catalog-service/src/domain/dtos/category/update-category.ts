import { ValidationResult } from '../../';
import { updateCategorySchema, ZodAdapter } from '../../../config';

export class UpdateCategoryDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description?: string,
  ) { }

  static update(props: Record<string, any>): ValidationResult<UpdateCategoryDto> {
    const { errors, validatedData } = ZodAdapter.validate(updateCategorySchema, props);

    return errors ? { errors } : { validatedData };
  }
}
