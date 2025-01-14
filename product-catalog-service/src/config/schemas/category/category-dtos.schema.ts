import { z } from 'zod';
import { CreateCategoryDto, UpdateCategoryDto } from '../../../domain';

export const createCategorySchema: z.ZodType<CreateCategoryDto> = z.object({
  name: z.string().nonempty('Category name is required'),
  description: z.string().optional(),
});

export const updateCategorySchema: z.ZodType<UpdateCategoryDto> = z.object({
  id: z.string().nonempty('Category ID is required'),
  name: z.string().nonempty('Category name is required'),
  description: z.string().optional(),
});
