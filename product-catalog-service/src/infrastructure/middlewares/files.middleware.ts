import { Request } from 'express';
import multer from 'multer';
import { CustomError } from '../../domain';

export class FilesMiddleware {
  static upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback,
    ) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(CustomError.badRequest('File is not an image'));
      }
    },
  });
}
