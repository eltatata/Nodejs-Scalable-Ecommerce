import { EmailDataSource, EmailRepository, EmailProps } from '../../domain';

export class EmailRepositoryImpl implements EmailRepository {
  constructor(private readonly emailDataSource: EmailDataSource) {}

  sendEmail(emailProps: EmailProps): Promise<void> {
    return this.emailDataSource.sendEmail(emailProps);
  }
}
