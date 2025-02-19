import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import morgan from 'morgan';
import { envs } from './config/envs.adapter';
import { RequestExt } from './interfaces/req.interfaces';
import { checkJwt } from './middlewares/token.middleware';
import { checkRole } from './middlewares/role.middleware';

const services = {
  user: envs.USER_SERVICE_URL,
  productCatalog: envs.PRODUCT_CATALOG_SERVICE_URL,
  shoppingCart: envs.SHOPPING_CART_SERVICE_URL,
  order: envs.ORDER_SERVICE_URL,
  payment: envs.PAYMENT_SERVICE_URL,
};

const app = express();
const port = envs.PORT;

app.use(morgan('dev'));

// Auth routes
app.use(
  '/auth/register',
  createProxyMiddleware({
    target: `${services.user}/auth/register`,
    changeOrigin: true,
  }),
);

app.use(
  '/auth/login',
  createProxyMiddleware({
    target: `${services.user}/auth/login`,
    changeOrigin: true,
  }),
);

// User routes
app.use(
  '/user',
  checkJwt,
  createProxyMiddleware({
    router: (req: RequestExt) => `${services.user}/user/${req.user?.id}`,
    changeOrigin: true,
  }),
);

// Product Catalog routes
app.use(
  '/category',
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return checkJwt(req, res, next);
    }
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return checkRole('admin')(req as RequestExt, res, next);
    }
    next();
  },
  createProxyMiddleware({
    target: `${services.productCatalog}/category`,
    changeOrigin: true,
  }),
);

app.use(
  '/product',
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return checkJwt(req, res, next);
    }
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return checkRole('admin')(req as RequestExt, res, next);
    }
    next();
  },
  createProxyMiddleware({
    target: `${services.productCatalog}/product`,
    changeOrigin: true,
  }),
);

// Shopping Cart routes
app.use(
  '/cart',
  checkJwt,
  createProxyMiddleware({
    router: (req: RequestExt) =>
      `${services.shoppingCart}/cart/${req.user?.id}`,
    changeOrigin: true,
  }),
);

// Order routes
app.use(
  '/order/:orderId',
  checkJwt,
  createProxyMiddleware({
    router: (req: RequestExt) =>
      `${services.order}/order/${req.user?.id}/${req.params.orderId}`,
    changeOrigin: true,
  }),
);

app.use(
  '/order',
  checkJwt,
  createProxyMiddleware({
    router: (req: RequestExt) => `${services.order}/order/${req.user?.id}`,
    changeOrigin: true,
  }),
);

// Payment routes
app.use(
  '/payment',
  checkJwt,
  createProxyMiddleware({
    router: (req: RequestExt) => `${services.payment}/payment/${req.user?.id}`,
    changeOrigin: true,
  }),
);

app.use(
  '/webhook',
  createProxyMiddleware({
    target: `${services.payment}/payment/webhook`,
    changeOrigin: true,
  }),
);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('API Gateway is running');
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send('Something broke!');
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
