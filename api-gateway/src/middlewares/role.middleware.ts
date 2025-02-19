import { Response, NextFunction } from 'express';
import { RequestExt } from '../interfaces/req.interfaces';

export const checkRole = (role: 'admin' | 'user') => {
  return (req: RequestExt, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      res.status(403).json({ message: 'Forbidden access' });
      return;
    }
    next();
  };
};
