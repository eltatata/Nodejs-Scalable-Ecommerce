import { EmailDataSource, EmailRepository, SendEmailDto } from '../../domain';

export class EmailRepositoryImpl implements EmailRepository {
  constructor(private readonly emailDataSource: EmailDataSource) {}

  sendEmail(sendEmailDto: SendEmailDto): Promise<void> {
    return this.emailDataSource.sendEmail(sendEmailDto);
  }
}
