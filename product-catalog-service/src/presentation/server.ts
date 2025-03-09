import express, { Router, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { v2 as cloudinary } from 'cloudinary';
import { ErrorHandlerService } from './';

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

interface Options {
  port: number;
  routes: Router;
  cloudinaryConfig: CloudinaryConfig;
}

export class Server {
  public readonly app = express();
  private serverListener?: import('http').Server;
  private readonly port: number;
  private readonly routes: Router;
  private readonly cloudinaryConfig: CloudinaryConfig;

  constructor(options: Options) {
    const { port, routes, cloudinaryConfig } = options;

    this.port = port;
    this.routes = routes;
    this.cloudinaryConfig = cloudinaryConfig;
  }

  start() {
    cloudinary.config(this.cloudinaryConfig);

    this.app.use(express.json());
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
