import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  /* 회원가입 */
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  /* 로그인 */
  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

}
