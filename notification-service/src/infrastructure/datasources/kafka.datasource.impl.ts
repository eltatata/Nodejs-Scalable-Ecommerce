import { Kafka, Consumer } from 'kafkajs';
import { envs } from '../../config';
import { KafkaDataSource } from '../../domain';

export class KafkaDataSourceImpl implements KafkaDataSource {
  private kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: envs.KAFKA_CLIENT_ID,
      brokers: envs.KAFKA_BROKERS.split(','),
    });
  }

  async consumeEvent(
    topic: string,
    groupId: string,
    onMessage: (message: Record<string, unknown>) => void,
  ): Promise<void> {
    const consumer: Consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const event = JSON.parse(message.value!.toString());
        onMessage(event);
      },
    });
  }
}
