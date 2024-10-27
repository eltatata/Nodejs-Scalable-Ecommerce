import { User } from '../../data';
import { UserEntity, UserDatasource, CustomError } from "../../domain";

export class UserDatasourceImpl implements UserDatasource {
  async findUserById(id: string): Promise<UserEntity> {
    const user = await User.findById(id);
    if (!user) throw CustomError.notFound("User not found");

    return UserEntity.fromObject(user);
  }
}
