import {
  UserEntity,
  UserDatasource,
  UserRepository,
  RegisterUserDto,
} from '../../domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  findUserById(id: string): Promise<UserEntity | null> {
    return this.userDatasource.findUserById(id);
  }

  findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userDatasource.findUserByEmail(email);
  }

  createUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.userDatasource.createUser(registerUserDto);
  }
}
