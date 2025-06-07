export interface PaymentSuccessfulProducer {
  sendPaymentSuccessfulEvent(event: Record<string, unknown>): Promise<void>;
}
