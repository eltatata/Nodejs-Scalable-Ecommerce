import { z } from 'zod';

import { SendEmailDto } from '../../domain';

export const sendEmailDtoSchema: z.ZodType<SendEmailDto> = z.object({
  to: z.string().email('Invalid email format').nonempty('To is required'),
  subject: z.string().trim().nonempty('Subject is required'),
  text: z.string().trim().nonempty('Text is required'),
});
