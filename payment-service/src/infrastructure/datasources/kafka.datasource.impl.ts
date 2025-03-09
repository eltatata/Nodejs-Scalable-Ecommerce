import { Kafka, Producer } from 'kafkajs';
import { envs } from '../../config';
import { KafkaDataSource } from '../../domain';

export class KafkaDataSourceImpl implements KafkaDataSource {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: envs.KAFKA_CLIENT_ID,
      brokers: envs.KAFKA_BROKERS.split(','),
    });
    this.producer = kafka.producer();
    this.connectProducer();
  }

  private async connectProducer(): Promise<void> {
    await this.producer.connect();
  }

  async sendEvent(
    topic: string,
    event: Record<string, unknown>,
  ): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(event) }],
    });
  }
}
