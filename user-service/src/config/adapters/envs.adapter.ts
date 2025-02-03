import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URI: get('MONGO_URI').required().asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
};
