import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface GetUserUseCase {
  execute(userId: string): Promise<UserEntity>;
}

export class GetUser implements GetUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  execute(id: string): Promise<UserEntity> {
    return this.userRepository.findUserById(id);
  }
}