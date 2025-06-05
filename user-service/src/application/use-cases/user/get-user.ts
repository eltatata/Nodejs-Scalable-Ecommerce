import { CustomError, UserEntity, UserRepository } from '../../../domain';

export interface GetUserUseCase {
  execute(userId: string): Promise<UserEntity>;
}

export class GetUser implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw CustomError.notFound('User not found');
    return user;
  }
}
