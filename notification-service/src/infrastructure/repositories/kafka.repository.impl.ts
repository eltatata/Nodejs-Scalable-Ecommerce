import { KafkaDataSource, KafkaRepository } from '../../domain';

export class KafkaRepositoryImpl implements KafkaRepository {
  constructor(private readonly kafkaDataSource: KafkaDataSource) {}

  async consumeEvent(
    topic: string,
    groupId: string,
    onMessage: (message: Record<string, unknown>) => void,
  ): Promise<void> {
    await this.kafkaDataSource.consumeEvent(topic, groupId, onMessage);
  }
}
