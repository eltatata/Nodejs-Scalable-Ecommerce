import { z } from 'zod';
import { CreateProductDto, UpdateProductDto } from '../../../domain';

export const createProductSchema: z.ZodType<CreateProductDto> = z.object({
  name: z.string().trim().nonempty('Product name is required'),
  description: z.string().trim().nonempty('Product description is required'),
  price: z.number().positive('Product price must be positive'),
  category: z.string().trim().nonempty('Category required'),
  inventory: z.number().positive('Product inventory must be positive'),
  images: z
    .array(z.instanceof(Buffer))
    .min(1, 'At least one product image is required'),
});

export const updateProductSchema: z.ZodType<UpdateProductDto> = z.object({
  id: z.string().trim().nonempty('Product ID is required'),
  name: z.string().trim().nonempty('Product name is required'),
  description: z.string().trim().nonempty('Product description is required'),
  price: z.number().positive('Product price must be positive'),
  category: z.string().trim().nonempty('Category required'),
  inventory: z.number().positive('Product inventory must be positive'),
  images: z.array(z.instanceof(Buffer)),
});
