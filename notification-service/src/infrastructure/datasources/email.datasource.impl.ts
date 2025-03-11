import { Resend } from 'resend';
import { envs } from '../../config';
import { EmailDataSource, EmailProps } from '../../domain';

export class EmailDataSourceImpl implements EmailDataSource {
  private readonly resend = new Resend(envs.RESEND_API_KEY);

  async sendEmail({ to, subject, html }: EmailProps): Promise<void> {
    await this.resend.emails.send({
      from: 'Scalable Ecommerce <onboarding@resend.dev>',
      to,
      subject,
      html,
    });
  }
}
