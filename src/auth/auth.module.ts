import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategry } from './jwt.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || config.get('jwt.secret'), // jwt에서 이용할 시크릿값. (노출되어선 안됨)
      signOptions: {
        expiresIn: config.get('jwt.expiresIn')
      }
    }),
    // forFeature는 이 모듈 안에 등록한다는 뜻.
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategry], // auth모듈에서 사용하기 위함
  exports: [JwtStrategry, PassportModule] // auth모듈 이외에서도 사용하기 위함.
})
export class AuthModule { }
