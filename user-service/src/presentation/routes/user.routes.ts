import { Router } from 'express';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure';
import { UserController } from '../';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);
    const userController = new UserController(userRepository);

    router.get('/:id', userController.getUser);

    return router;
  }
}
