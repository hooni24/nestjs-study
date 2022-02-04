import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  /* 회원가입 */
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  /* 로그인 */
  async signIn(authCredentialDto: AuthCredentialDto): Promise<object> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      // 유저 token생성 (secret + payload)
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

}
