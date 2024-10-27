import { UserEntity, UserDatasource, UserRepository } from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) { }

  findUserById(id: string): Promise<UserEntity> {
    return this.userDatasource.findUserById(id);
  }
}
