export abstract class KafkaRepository {
  abstract consumeEvent(
    topic: string,
    groupId: string,
    onMessage: (message: Record<string, unknown>) => void,
  ): Promise<void>;
}
