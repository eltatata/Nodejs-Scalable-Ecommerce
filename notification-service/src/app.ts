import { PaymentSuccessfulConsumer } from './consumers/payment-successful.consumer';
import { PaymentSuccessfulHandler } from './handlers/payment-successful.handler';
import { EmailService } from './services/email.service';

const emailService = new EmailService();
const handler = new PaymentSuccessfulHandler(emailService);
const consumer = new PaymentSuccessfulConsumer(handler);

consumer.start().then(() => {
  console.log(
    'Kafka notification consumer started for payment successful events',
  );
});
