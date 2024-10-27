import { JwtAdapter } from "../../../config";
import { AuthRepository, CustomError, LoginUserDto, UserEntity } from "../../";

export type SignToken = (payload: Record<string, any>, duration?: string) => Promise<string | null>;

export type LoginUserUseCaseResp = Promise<{
  user: UserEntity;
  token: string;
}>;

export interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): LoginUserUseCaseResp;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly generateToken: SignToken = JwtAdapter.generateToken,
  ) { }

  async execute(loginUserDto: LoginUserDto): LoginUserUseCaseResp {
    const user = await this.authRepository.loginUser(loginUserDto);
    if (!user) throw CustomError.notFound("User not found");

    const token = await this.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer("Failed to generate token");

    return { user, token };
  }
}
