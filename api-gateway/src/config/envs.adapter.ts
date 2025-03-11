import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').default(3000).asPortNumber(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  USER_SERVICE_URL: get('USER_SERVICE_URL')
    .default('http://localhost:3001/api')
    .asString(),
  PRODUCT_CATALOG_SERVICE_URL: get('PRODUCT_CATALOG_SERVICE_URL')
    .default('http://localhost:3002/api')
    .asString(),
  SHOPPING_CART_SERVICE_URL: get('SHOPPING_CART_SERVICE_URL')
    .default('http://localhost:3003/api')
    .asString(),
  ORDER_SERVICE_URL: get('ORDER_SERVICE_URL')
    .default('http://localhost:3004/api')
    .asString(),
  PAYMENT_SERVICE_URL: get('PAYMENT_SERVICE_URL')
    .default('http://localhost:3005/api')
    .asString(),
};
