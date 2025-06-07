import { Kafka } from 'kafkajs';
import { envs } from '../';

class KafkaClientSingleton {
  private static instance: Kafka;

  private constructor() {}

  static getInstance(): Kafka {
    if (!KafkaClientSingleton.instance) {
      KafkaClientSingleton.instance = new Kafka({
        clientId: envs.KAFKA_CLIENT_ID,
        brokers: envs.KAFKA_BROKERS.split(','),
      });
    }

    return KafkaClientSingleton.instance;
  }
}

export const kafkaClient = KafkaClientSingleton.getInstance();
