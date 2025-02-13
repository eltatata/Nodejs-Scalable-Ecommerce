import { ValidationResult } from '../../';
import { sendEmailDtoSchema, ZodAdapter } from '../../../config';

interface SendEmailDtoProps {
  to: string;
  subject: string;
  text: string;
}

export class SendEmailDto {
  private constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly text: string,
  ) {}

  static create(props: SendEmailDtoProps): ValidationResult<SendEmailDto> {
    const { errors, validatedData } = ZodAdapter.validate(
      sendEmailDtoSchema,
      props,
    );

    return errors ? { errors } : { validatedData };
  }
}
