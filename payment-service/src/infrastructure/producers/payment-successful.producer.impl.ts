import { Producer } from 'kafkajs';
import { kafkaClient } from '../../config';
import { PaymentSuccessfulProducer } from '../../domain';

export class PaymentSuccessfulProducerImpl
  implements PaymentSuccessfulProducer
{
  async sendPaymentSuccessfulEvent(
    event: Record<string, unknown>,
  ): Promise<void> {
    const producer: Producer = kafkaClient.producer();
    await producer.connect();
    await producer.send({
      topic: 'payment-successful',
      messages: [{ value: JSON.stringify(event) }],
    });
    await producer.disconnect();
  }
}
