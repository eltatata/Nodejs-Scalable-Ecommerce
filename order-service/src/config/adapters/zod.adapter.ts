import { z, ZodError } from 'zod';

import { ValidationResult } from '../../domain';

export class ZodAdapter {
  static validate<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
  ): ValidationResult<T> {
    try {
      const validatedData = schema.parse(data);
      return { validatedData };
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return { errors };
      }
      return {
        errors: [{ field: 'unknown', message: 'Unknown validation error' }],
      };
    }
  }
}
