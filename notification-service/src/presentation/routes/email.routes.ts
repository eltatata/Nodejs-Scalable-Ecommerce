import { Router } from 'express';
import { EmailDataSourceImpl, EmailRepositoryImpl } from '../../infrastructure';
import { EmailController } from '../';

export class EmailRoutes {
  static get routes(): Router {
    const router = Router();

    const emailDataSource = new EmailDataSourceImpl();
    const emailRepository = new EmailRepositoryImpl(emailDataSource);
    const emailController = new EmailController(emailRepository);

    router.post('/send-email', emailController.sendEmail);

    return router;
  }
}
