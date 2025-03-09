export abstract class KafkaDataSource {
  abstract sendEvent(
    topic: string,
    event: Record<string, unknown>,
  ): Promise<void>;
}
