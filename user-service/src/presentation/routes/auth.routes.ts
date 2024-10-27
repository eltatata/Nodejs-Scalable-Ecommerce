import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { AuthController } from "../";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authDatasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);
    const authController = new AuthController(authRepository);

    router.post('/register', authController.registerUser);
    router.post('/login', authController.loginUser);

    return router;
  }
}
