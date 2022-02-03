import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],

  // 매번 실행시 테이블 drop,create실행
  synchronize: true
}