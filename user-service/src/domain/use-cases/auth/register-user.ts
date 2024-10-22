import { AuthRepository, RegisterUserDto, UserEntity } from "../..";

export interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly authRepository: AuthRepository) { }

  execute(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authRepository.registerUser(registerUserDto);
  }
}
