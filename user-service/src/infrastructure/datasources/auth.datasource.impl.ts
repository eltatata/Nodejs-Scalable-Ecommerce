import { User } from '../../data';
import { bcryptAdapter, JwtAdapter } from "../../config";
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
  // UserRole
} from '../../domain';

export class AuthDatasourceImpl implements AuthDatasource {
  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const existUser = await User.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.conflict("User already exists");

    const user = new User(registerUserDto);
    user.password = bcryptAdapter.hash(registerUserDto.password);
    await user.save();

    const userEntity = UserEntity.fromObject(user);

    return userEntity;
  }


  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await User.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.notFound("User not found");

    const isPasswordValid = bcryptAdapter.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) throw CustomError.unauthorized("Invalid password");

    const userEntity = UserEntity.fromObject(user);

    return userEntity;
  }
}
