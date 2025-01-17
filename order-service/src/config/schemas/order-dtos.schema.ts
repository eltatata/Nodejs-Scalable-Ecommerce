import { z } from 'zod';
import { CreateOrderDto, UpdateOrderDto } from '../../domain';

export const createOrderDtoSchema: z.ZodType<CreateOrderDto> = z.object({
  userId: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      price: z.number(),
    }),
  ),
  address: z.string(),
});

export const updateOrderDtoSchema: z.ZodType<UpdateOrderDto> = z.object({
  id: z.string(),
  status: z.enum([
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
  ]),
});
