import { UserEntity } from "../";

export abstract class UserRepository {
  abstract findUserById(id: string): Promise<UserEntity>;
}
