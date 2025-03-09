import { KafkaDataSource, KafkaRepository } from '../../domain';

export class KafkaRepositoryImpl implements KafkaRepository {
  constructor(private readonly kafkaDataSource: KafkaDataSource) {}

  sendEvent(topic: string, event: Record<string, unknown>): Promise<void> {
    return this.kafkaDataSource.sendEvent(topic, event);
  }
}
