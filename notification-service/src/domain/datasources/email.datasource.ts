import { EmailProps } from '../';

export abstract class EmailDataSource {
  abstract sendEmail(emailProps: EmailProps): Promise<void>;
}
