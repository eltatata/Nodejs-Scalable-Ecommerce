import { Router } from 'express';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure';
import { AuthController } from '../';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const authController = new AuthController(userRepository);

    router.post('/register', authController.registerUser);
    router.post('/login', authController.loginUser);

    return router;
  }
}
