import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { envs } from '../config/envs.adapter';
import { RequestExt } from '../interfaces/req.interfaces';

export const checkJwt = async (
  req: RequestExt,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.headers?.authorization;
    if (!token) {
      res.status(401).json({
        message: 'Unauthorized access, Bearer token not found in header',
      });
      return;
    }
    token = token.split(' ')[1];

    const payload = verify(token, envs.JWT_SECRET) as JwtPayload;
    if (!payload) {
      res.status(401).json({ message: 'Unauthorized access, Invalid token' });
      return;
    }

    req.user = payload;

    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized access, Invalid token' });
    return;
  }
};
