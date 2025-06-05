import { Request, Response } from 'express';
import { ErrorHandlerService } from '../';
import { LoginUserDto, RegisterUserDto, UserRepository } from '../../domain';
import { LoginUser, RegisterUser } from '../../application';

export class AuthController {
  constructor(private readonly userRepository: UserRepository) {}

  registerUser = (req: Request, res: Response) => {
    const { errors, validatedData } = RegisterUserDto.create(req.body);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new RegisterUser(this.userRepository)
      .execute(validatedData!)
      .then((data) => res.status(201).json(data))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const { errors, validatedData } = LoginUserDto.create(req.body);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    new LoginUser(this.userRepository)
      .execute(validatedData!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandlerService.handleError(error, res));
  };
}
