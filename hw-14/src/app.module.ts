import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { User } from './user/User.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yevheniii',
      password: 'qwerty12345',
      database: 'nest_exhibitblog',
      entities: [User],
      synchronize: false,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
