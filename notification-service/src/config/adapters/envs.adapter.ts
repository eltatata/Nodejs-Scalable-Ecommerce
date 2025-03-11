import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  RESEND_API_KEY: get('RESEND_API_KEY').required().asString(),
  KAFKA_BROKERS: get('KAFKA_BROKERS').required().asString(),
  KAFKA_CLIENT_ID: get('KAFKA_CLIENT_ID').required().asString(),
  KAFKA_GROUP_ID: get('KAFKA_GROUP_ID').required().asString(),
};
