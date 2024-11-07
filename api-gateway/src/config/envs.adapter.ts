import "dotenv/config";
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').default(3000).asPortNumber(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  USER_SERVICE_URL: get('USER_SERVICE_URL').default('http://localhost:3001').asString(),
  PRODUCT_CATALOG_SERVICE_URL: get('PRODUCT_CATALOG_SERVICE_URL').default('http://localhost:3002').asString(),
}
