import { ConflictException } from "@nestjs/common";
import { EntityRepository, QueryFailedError, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  /* 유저 생성 */
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password });

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