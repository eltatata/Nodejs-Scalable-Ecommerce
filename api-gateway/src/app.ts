import { envs } from './config/envs.adapter';
import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { checkJwt, RequestExt } from './middlewares/token.middleware';

const app = express();
const port = envs.PORT;
const services = {
  user: envs.USER_SERVICE_URL,
  productCatalog: envs.PRODUCT_CATALOG_SERVICE_URL,
}

app.use("/auth/register", createProxyMiddleware({
  target: `${services.user}/auth/register`,
  changeOrigin: true,
}));

app.use("/auth/login", createProxyMiddleware({
  target: `${services.user}/auth/login`,
  changeOrigin: true,
}));

app.use("/user", checkJwt, createProxyMiddleware({
  router: (req: RequestExt) => `${services.user}/user/${req.uid}`,
  changeOrigin: true,
}));

app.use("/category", createProxyMiddleware({
  target: `${services.productCatalog}/category`,
  changeOrigin: true,
}));

app.use("/product", createProxyMiddleware({
  target: `${services.productCatalog}/product`,
  changeOrigin: true,
}));

app.get('/', (req: Request, res: Response) => {
  res.send('API Gateway is running');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
