import { EmailProps } from '../';

export abstract class EmailRepository {
  abstract sendEmail(emailProps: EmailProps): Promise<void>;
}
