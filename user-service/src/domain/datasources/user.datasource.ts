import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
  abstract findUserById(id: string): Promise<UserEntity>;
}
