import { z } from 'zod';

import { UserEntity } from '../../domain';

export const userSchema: z.ZodType<UserEntity> = z.object({
  id: z.string(),
  name: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  role: z.string(),
  password: z.string().min(5),
  address: z.string().optional(),
  phone: z.string().optional(),
});
