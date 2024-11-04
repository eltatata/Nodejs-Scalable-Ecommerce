import { envs } from './config';
import { MongoDatabase } from './data';
import { AppRoutes, Server } from './presentation';

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect(envs.MONGO_URI);

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    cloudinaryConfig: {
      cloud_name: envs.CLOUD_NAME,
      api_key: envs.CLOUDINARY_API_KEY,
      api_secret: envs.CLOUDINARY_API_SECRET,
    },
  });

  server.start();
}
