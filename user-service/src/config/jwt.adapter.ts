import { sign, verify } from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {
  static generateToken(payload: any, expiresIn: string = "2h"): Promise<string | null> {
    return new Promise((resolve) => {
      sign(payload, JWT_SECRET, { expiresIn }, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  };

  static verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  };
}
