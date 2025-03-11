export abstract class KafkaDataSource {
  abstract consumeEvent(
    topic: string,
    groupId: string,
    onMessage: (message: Record<string, unknown>) => void,
  ): Promise<void>;
}
