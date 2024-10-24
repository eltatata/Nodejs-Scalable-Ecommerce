import { z } from 'zod';

import { LoginUserDto, RegisterUserDto } from '../../domain';

export const registerUserSchema: z.ZodType<RegisterUserDto> = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(5),
});

export const loginUserSchema: z.ZodType<LoginUserDto> = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
