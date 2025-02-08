import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  ORDER_API_URL: get('ORDER_API_URL').required().asString(),
  STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),
};
