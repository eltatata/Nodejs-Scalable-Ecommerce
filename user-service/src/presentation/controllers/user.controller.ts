import { Request, Response } from "express";
import { GetUser, UserRepository } from "../../domain";
import { ErrorHandlerService } from "../services/error-handler.service";

export class UserController {
  constructor(private readonly userRepository: UserRepository) { }

  getUser = (req: Request, res: Response) => {
    const id = req.params.id;

    new GetUser(this.userRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => ErrorHandlerService.handleError(error, res));
  }
}