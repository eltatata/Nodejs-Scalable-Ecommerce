import { emailTemplateGenerator } from '../config';
import { EmailService } from '../services/email.service';

export class PaymentSuccessfulHandler {
  constructor(private readonly emailService: EmailService) {}

  async handle(event: Record<string, unknown>): Promise<void> {
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
      await this.emailService.sendEmail(emailData);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
