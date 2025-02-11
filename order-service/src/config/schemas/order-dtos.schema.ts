import { z } from 'zod';
import { CreateOrderDto, UpdateOrderDto } from '../../domain';

export const createOrderDtoSchema: z.ZodType<CreateOrderDto> = z.object({
  userId: z.string().trim().nonempty("User ID can't be empty"),
  items: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
      }),
    )
    .min(1, 'Items must have at least one product'),
});

export const updateOrderDtoSchema: z.ZodType<UpdateOrderDto> = z.object({
  id: z.string().trim().nonempty("Order ID can't be empty"),
  status: z.enum(['pending', 'paid', 'processing', 'shipped', 'delivered']),
  address: z.string().trim().nonempty("Address can't be empty"),
});
