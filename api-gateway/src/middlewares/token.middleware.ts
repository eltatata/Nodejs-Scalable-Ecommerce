import { envs } from '../config/envs.adapter';
import { JwtPayload, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export interface RequestExt extends Request {
  uid?: JwtPayload | { id: string };
}

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

    req.uid = payload.id;

    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized access, Invalid token' });
    return;
  }
};
