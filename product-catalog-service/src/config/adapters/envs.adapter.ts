import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URI: get('MONGO_URI').required().asString(),
  CLOUD_NAME: get('CLOUD_NAME').required().asString(),
  CLOUDINARY_FOLDER: get('CLOUDINARY_FOLDER').required().asString(),
  CLOUDINARY_API_KEY: get('API_KEY').required().asString(),
  CLOUDINARY_API_SECRET: get('API_SECRET').required().asString(),
};
