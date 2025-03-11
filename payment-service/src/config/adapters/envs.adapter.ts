import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  ORDER_API_URL: get('ORDER_API_URL').required().asString(),
  STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),
  STRIPE_WEBHOOK_SECRET: get('STRIPE_WEBHOOK_SECRET').required().asString(),
  STRIPE_CURRENCY: get('STRIPE_CURRENCY').required().asString(),
  KAFKA_BROKERS: get('KAFKA_BROKERS').required().asString(),
  KAFKA_CLIENT_ID: get('KAFKA_CLIENT_ID').required().asString(),
};
