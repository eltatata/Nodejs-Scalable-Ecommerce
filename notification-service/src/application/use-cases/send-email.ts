import { EmailRepository, EmailProps } from '../../domain';

export interface SendEmailUseCase {
  execute(emailProps: EmailProps): Promise<void>;
}

export class SendEmail implements SendEmailUseCase {
  constructor(private readonly emailRepository: EmailRepository) {}

  async execute(sendEmailDto: EmailProps): Promise<void> {
    await this.emailRepository.sendEmail(sendEmailDto);
  }
}
