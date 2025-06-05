import { bcryptAdapter } from '../../../config';
import {
  CustomError,
  RegisterUserDto,
  UserEntity,
  UserRepository,
} from '../../../domain';

export interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findUserByEmail(
      registerUserDto.email,
    );
    if (existingUser) throw CustomError.conflict('User already exists');

    const userWithHashedPassword = {
      ...registerUserDto,
      password: bcryptAdapter.hash(registerUserDto.password),
    };

    const createdUser = await this.userRepository.createUser(
      userWithHashedPassword,
    );
    delete createdUser.password;

    return createdUser;
  }
}
