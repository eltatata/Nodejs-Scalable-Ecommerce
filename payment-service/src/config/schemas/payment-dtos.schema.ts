import { z } from 'zod';
import { CreatePaymentDto } from '../../domain';

export const createPaymentSchema: z.ZodType<CreatePaymentDto> = z.object({
  orderId: z.string().nonempty('Order ID is required'),
  amount: z.number().positive('Amount must be positive'),
  paymentMethod: z.string().nonempty('Payment method is required'),
});
