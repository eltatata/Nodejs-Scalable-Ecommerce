import { UserEntity } from "../";

export abstract class UserDatasource {
  abstract findUserById(id: string): Promise<UserEntity>;
}
