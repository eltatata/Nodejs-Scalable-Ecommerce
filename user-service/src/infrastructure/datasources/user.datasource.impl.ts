import { User } from '../../data';
import { UserEntity, UserDatasource, RegisterUserDto } from '../../domain';

export class UserDatasourceImpl implements UserDatasource {
  async findUserById(id: string): Promise<UserEntity | null> {
    const user = await User.findById(id).select('-password');
    return user ? UserEntity.fromObject(user) : null;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({ email });
    return user ? UserEntity.fromObject(user) : null;
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const user = new User(registerUserDto);
    await user.save();
    return UserEntity.fromObject(user);
  }
}
