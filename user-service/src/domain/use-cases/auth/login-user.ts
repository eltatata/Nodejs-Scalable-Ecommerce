import { AuthRepository, LoginUserDto, UserEntity } from "../..";
import { JwtAdapter } from "../../../config";

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
    if (!user) throw new Error("User not found");

    const token = await this.generateToken({ id: user.id });
    if (!token) throw new Error("Error generating token");

    return { user, token };
  }
}
