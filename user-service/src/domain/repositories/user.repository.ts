import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract findUserById(id: string): Promise<UserEntity>;
}