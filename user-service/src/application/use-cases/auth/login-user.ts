import { JwtAdapter, bcryptAdapter } from '../../../config';
import {
  CustomError,
  LoginUserDto,
  UserEntity,
  UserRepository,
} from '../../../domain';

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
    if (!bcryptAdapter.compare(loginUserDto.password, user.password!)) {
      throw CustomError.badRequest('Invalid password');
    }

    const token = await JwtAdapter.generateToken({
      id: user.id,
      role: user.role,
    });
    if (!token) throw CustomError.internalServer('Failed to generate token');

    delete user.password;

    return { user, token };
  }
}
