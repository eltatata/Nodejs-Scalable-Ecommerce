import { JwtAdapter } from '../../../config';
import { CustomError, LoginUserDto, UserEntity, UserRepository } from '../../';

export type LoginUserUseCaseResp = Promise<{
  user: UserEntity;
  token: string;
}>;

export interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): LoginUserUseCaseResp;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(loginUserDto: LoginUserDto): LoginUserUseCaseResp {
    const user = await this.userRepository.findUserByEmail(loginUserDto.email);
    if (!user) throw CustomError.notFound('User not found');

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer('Failed to generate token');

    return { user, token };
  }
}
