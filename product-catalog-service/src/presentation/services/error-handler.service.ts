import { Response } from 'express';
import { MulterError } from 'multer';
import { CustomError } from '../../domain';

export class ErrorHandlerService {
  static handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    if (error instanceof MulterError) {
      res.status(400).json({ error: error.message });
      return;
    }

    console.error(`Error: ${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
