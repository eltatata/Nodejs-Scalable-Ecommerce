import { z } from 'zod';

import { UserEntity } from '../../domain';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export const userSchema: z.ZodType<UserEntity> = z.object({
  id: z.string(),  // Change id to string
  name: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  role: z.array(z.string()),  // Change role to array of strings
  address: z.string().optional(),
  phone: z.string().optional(),
});
