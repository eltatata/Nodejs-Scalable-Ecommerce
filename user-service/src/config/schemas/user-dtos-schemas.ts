import { z } from 'zod';

import { LoginUserDto, RegisterUserDto } from '../../domain';

export const registerUserSchema: z.ZodType<RegisterUserDto> = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(50, 'Name must be at most 50 characters long'),
  lastname: z
    .string()
    .trim()
    .min(1, 'Lastname is required')
    .max(50, 'Lastname must be at most 50 characters long'),
  email: z.string().trim().email('Invalid email format'),
  password: z
    .string()
    .trim()
    .min(5, 'Password must be at least 5 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character',
    ),
});

export const loginUserSchema: z.ZodType<LoginUserDto> = z.object({
  email: z.string().trim().email('Invalid email format'),
  password: z
    .string()
    .trim()
    .min(5, 'Password must be at least 5 characters long'),
});
