import express, { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { GlobalErrorMiddleware } from '../infrastructure';

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

  async start() {
    cloudinary.config(this.cloudinaryConfig);

    this.app.use(express.json());

    this.app.use(this.routes);

    this.app.use(GlobalErrorMiddleware.handle);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
