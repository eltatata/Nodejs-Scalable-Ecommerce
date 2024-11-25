import { Response } from 'express';
import { CustomError } from '../../domain';

export class ErrorHandlerService {
  static handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
