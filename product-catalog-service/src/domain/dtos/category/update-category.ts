import { ValidationResult } from '../../';
import { updateCategorySchema, ZodAdapter } from '../../../config';

interface UpdateCategoryDtoProps {
  id: string;
  name: string;
  description?: string;
}

export class UpdateCategoryDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description?: string,
  ) {}

  static update(
    props: UpdateCategoryDtoProps,
  ): ValidationResult<UpdateCategoryDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      updateCategorySchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
