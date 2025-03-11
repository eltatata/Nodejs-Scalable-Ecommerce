import express, { Router, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { ErrorHandlerService } from './';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: import('http').Server;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  start() {
    this.app.use((req, res, next) => {
      if (req.originalUrl.includes('webhook')) {
        next();
      } else {
        express.json()(req, res, next);
      }
    });
    this.app.use(morgan('dev'));

    this.app.use(this.routes);

    this.app.use(
      (err: unknown, req: Request, res: Response, next: NextFunction) => {
        ErrorHandlerService.handleError(err, res);
        next();
      },
    );

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
