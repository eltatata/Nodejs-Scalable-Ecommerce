import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { envs } from './config/envs.adapter';
import { checkJwt, RequestExt } from './middlewares/token.middleware';

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
    router: (req: RequestExt) => `${services.user}/user/${req.uid}`,
    changeOrigin: true,
  }),
);

// Product Catalog routes
app.use(
  '/category',
  checkJwt,
  createProxyMiddleware({
    target: `${services.productCatalog}/category`,
    changeOrigin: true,
  }),
);

app.use(
  '/product',
  checkJwt,
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
    router: (req: RequestExt) => `${services.shoppingCart}/cart/${req.uid}`,
    changeOrigin: true,
  }),
);

// Order routes
app.use(
  '/order/:orderId',
  checkJwt,
  createProxyMiddleware({
    router: (req: RequestExt) =>
      `${services.order}/order/${req.uid}/${req.params.orderId}`,
    changeOrigin: true,
  }),
);

app.use(
  '/order',
  checkJwt,
  createProxyMiddleware({
    router: (req: RequestExt) => `${services.order}/order/${req.uid}`,
    changeOrigin: true,
  }),
);

// Payment routes
app.use(
  '/payment',
  checkJwt,
  createProxyMiddleware({
    router: (req: RequestExt) => `${services.payment}/payment/${req.uid}`,
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
