import { SendEmailDto } from '../';

export abstract class EmailRepository {
  abstract sendEmail(sendEmailDto: SendEmailDto): Promise<void>;
}
