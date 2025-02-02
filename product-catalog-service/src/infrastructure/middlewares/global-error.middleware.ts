import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import { ErrorHandlerService } from '../../presentation';

export class GlobalErrorMiddleware {
  static handle(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof MulterError) {
      res.status(400).json({ error: err.message });
      return;
    }

    ErrorHandlerService.handleError(err, res);
    next();
  }
}
