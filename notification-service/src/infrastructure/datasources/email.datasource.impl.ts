import { Resend } from 'resend';
import { envs } from '../../config';
import { EmailDataSource, SendEmailDto } from '../../domain';

export class EmailDataSourceImpl implements EmailDataSource {
  private readonly resend = new Resend(envs.RESEND_API_KEY);

  async sendEmail(sendEmailDto: SendEmailDto): Promise<void> {
    await this.resend.emails.send({
      from: 'Scalable Ecommerce <onboarding@resend.dev>',
      to: sendEmailDto.to,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
    });
  }
}
