import { emailTemplateGenerator } from '../config';
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
        const { name, email, orderId, invoicedAmount, paymentMethod, address } =
          event;

        const emailData = {
          to: email as string,
          subject: 'Payment successful',
          html: emailTemplateGenerator({
            name: name as string,
            orderId: orderId as string,
            invoicedAmount: (invoicedAmount as number) / 100,
            paymentMethod: paymentMethod as string,
            address: address as string,
          }),
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
