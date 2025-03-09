import { EmailRepository, SendEmail } from '../domain';
import { KafkaRepositoryImpl } from './';

export class KafkaConsumer {
  constructor(
    private readonly emailRepository: EmailRepository,
    private readonly kafkaRepository: KafkaRepositoryImpl,
  ) {}

  async start(): Promise<void> {
    await this.kafkaRepository.consumeEvent(
      'payment-successful',
      'notification-group',
      async (event) => {
        const { email } = event;

        const emailData = {
          to: email as string,
          subject: 'Payment successful',
          text: 'Your payment was successful, your order is being processed',
        };

        try {
          await new SendEmail(this.emailRepository).execute(emailData);
          console.log('Email sent');
        } catch (error) {
          console.error('Error sending email', error);
        }
      },
    );
  }
}
