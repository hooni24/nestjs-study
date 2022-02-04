import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret1234', // jwt에서 이용할 시크릿값. (노출되어선 안됨)
      signOptions: {
        expiresIn: 60 * 60  // 60초씩 60번 = 1시간
      }
    }),
    // forFeature는 이 모듈 안에 등록한다는 뜻.
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
