import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import { EmailRepository, SendEmail, SendEmailDto } from '../../domain';

export class EmailController {
  constructor(private readonly emailRepository: EmailRepository) {}

  sendEmail = (req: Request, res: Response) => {
    const { errors, validatedData } = SendEmailDto.create(req.body);

    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new SendEmail(this.emailRepository)
      .execute(validatedData!)
      .then(() => res.status(200).json({ message: 'Email sent successfully' }))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };
}
