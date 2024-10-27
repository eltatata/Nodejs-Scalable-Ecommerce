import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) { }

  registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.registerUser(registerUserDto);
  }

  loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.loginUser(loginUserDto);
  }
}
