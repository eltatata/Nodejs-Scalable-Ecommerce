import { Consumer } from 'kafkajs';
import { kafkaClient } from '../config';
import { PaymentSuccessfulHandler } from '../handlers/payment-successful.handler';

export class PaymentSuccessfulConsumer {
  constructor(
    private readonly paymentSuccessfulHandler: PaymentSuccessfulHandler,
  ) {}

  async start(): Promise<void> {
    const consumer: Consumer = kafkaClient.consumer({
      groupId: 'notification-group',
    });

    await consumer.connect();
    await consumer.subscribe({
      topic: 'payment-successful',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const event = JSON.parse(message.value!.toString());
        await this.paymentSuccessfulHandler.handle(event);
      },
    });
  }
}
