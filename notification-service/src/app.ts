import { envs } from './config';
import { AppRoutes, Server } from './presentation';
import {
  EmailDataSourceImpl,
  EmailRepositoryImpl,
  KafkaDataSourceImpl,
  KafkaRepositoryImpl,
  KafkaConsumer,
} from './infrastructure';

(async () => {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  server.start();

  const emailDataSource = new EmailDataSourceImpl();
  const emailRepository = new EmailRepositoryImpl(emailDataSource);

  const kafkaDataSource = new KafkaDataSourceImpl();
  const kafkaRepository = new KafkaRepositoryImpl(kafkaDataSource);

  const kafkaConsumer = new KafkaConsumer(emailRepository, kafkaRepository);
  await kafkaConsumer.start();
})();
