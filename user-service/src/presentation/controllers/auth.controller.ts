import { Request, Response } from 'express';
import { ErrorHandlerService } from '..';
import { AuthRepository, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from '../../domain';

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) { }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.status(201).json(data))
      .catch(error => ErrorHandlerService.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then(data => res.json(data))
      .catch(error => ErrorHandlerService.handleError(error, res));
  };
}
