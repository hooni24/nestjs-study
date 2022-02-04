import { ConflictException } from "@nestjs/common";
import { EntityRepository, QueryFailedError, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  /* 유저 생성 */
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // unique 에러
        throw new ConflictException('Existing username');
      }
      throw error;
    }
  }

}