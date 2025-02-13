import { SendEmailDto } from '../';

export abstract class EmailDataSource {
  abstract sendEmail(sendEmailDto: SendEmailDto): Promise<void>;
}
