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

// Helper function to create proxy middleware
const createProxy = (target: string, router?: (req: RequestExt) => string) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    router,
  });

// Helper function to add authentication and role checks
const addAuthAndRoleChecks =
  (role: 'admin' | 'user') =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return checkJwt(req, res, () =>
        checkRole(role)(req as RequestExt, res, next),
      );
    }
    next();
  };

// Auth routes
app.use('/auth/register', createProxy(`${services.user}/auth/register`));
app.use('/auth/login', createProxy(`${services.user}/auth/login`));

// User routes
app.use(
  '/user',
  checkJwt,
  createProxy(
    services.user,
    (req: RequestExt) => `${services.user}/user/${req.user?.id}`,
  ),
);

// Product Catalog routes
app.use(
  '/category',
  addAuthAndRoleChecks('admin'),
  createProxy(`${services.productCatalog}/category`),
);
app.use(
  '/product',
  addAuthAndRoleChecks('admin'),
  createProxy(`${services.productCatalog}/product`),
);

// Shopping Cart routes
app.use(
  '/cart',
  checkJwt,
  createProxy(
    services.shoppingCart,
    (req: RequestExt) => `${services.shoppingCart}/cart/${req.user?.id}`,
  ),
);

// Order routes
app.use(
  '/order/:orderId',
  checkJwt,
  createProxy(
    services.order,
    (req: RequestExt) =>
      `${services.order}/order/${req.user?.id}/${req.params.orderId}`,
  ),
);
app.use(
  '/order',
  checkJwt,
  createProxy(
    services.order,
    (req: RequestExt) => `${services.order}/order/${req.user?.id}`,
  ),
);

// Payment routes
app.use(
  '/payment',
  checkJwt,
  createProxy(
    services.payment,
    (req: RequestExt) => `${services.payment}/payment/${req.user?.id}`,
  ),
);
app.use('/webhook', createProxy(`${services.payment}/payment/webhook`));

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('API Gateway is running');
});

// Error handling middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send('Something broke!');
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
