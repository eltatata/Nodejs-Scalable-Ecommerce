import { CustomError, RegisterUserDto, UserEntity, UserRepository } from "../../";

export interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findUserByEmail(registerUserDto.email);
    if (existingUser) throw CustomError.conflict('User already exists');

    return this.userRepository.createUser(registerUserDto);
  }
}
