import {
  EmailDataSourceImpl,
  EmailRepositoryImpl,
  KafkaDataSourceImpl,
  KafkaRepositoryImpl,
  KafkaConsumer,
} from './infrastructure';

(() => {
  main();
})();

async function main() {
  const emailDataSource = new EmailDataSourceImpl();
  const emailRepository = new EmailRepositoryImpl(emailDataSource);

  const kafkaDataSource = new KafkaDataSourceImpl();
  const kafkaRepository = new KafkaRepositoryImpl(kafkaDataSource);

  const kafkaConsumer = new KafkaConsumer(emailRepository, kafkaRepository);
  await kafkaConsumer.start();
}
