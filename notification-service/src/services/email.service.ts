import { Resend } from 'resend';
import { envs } from '../config';
import { PaymentSuccessfulEvent } from '../events/payment-successful.event';

export class EmailService {
  private readonly resend = new Resend(envs.RESEND_API_KEY);

  async sendEmail({
    to,
    subject,
    html,
  }: PaymentSuccessfulEvent): Promise<void> {
    await this.resend.emails.send({
      from: 'Scalable Ecommerce <onboarding@resend.dev>',
      to,
      subject,
      html,
    });
  }
}
