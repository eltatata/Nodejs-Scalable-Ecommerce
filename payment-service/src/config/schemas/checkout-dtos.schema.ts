import { z } from 'zod';
import { CheckoutDto } from '../../domain';

export const checkoutSchema: z.ZodType<CheckoutDto> = z.object({
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
