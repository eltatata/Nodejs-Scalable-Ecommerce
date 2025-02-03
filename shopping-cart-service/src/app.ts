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
  });

  server.start();
}
