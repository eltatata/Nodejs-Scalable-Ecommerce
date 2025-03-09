export abstract class KafkaRepository {
  abstract sendEvent(
    topic: string,
    event: Record<string, unknown>,
  ): Promise<void>;
}
