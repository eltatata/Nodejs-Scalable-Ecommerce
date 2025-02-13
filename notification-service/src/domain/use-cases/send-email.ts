import { EmailRepository, SendEmailDto } from '../';

export interface SendEmailUseCase {
  execute(sendEmailDto: SendEmailDto): Promise<void>;
}

export class SendEmail implements SendEmailUseCase {
  constructor(private readonly emailRepository: EmailRepository) {}

  async execute(sendEmailDto: SendEmailDto): Promise<void> {
    await this.emailRepository.sendEmail(sendEmailDto);
  }
}
