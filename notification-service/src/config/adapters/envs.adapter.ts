import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  RESEND_API_KEY: get('RESEND_API_KEY').required().asString(),
};
