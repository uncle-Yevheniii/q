import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExhibitModule } from './exhibit/exhibit.module';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/Comment.entity';
import { Exhibit } from './exhibit/Exhibit.entity';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/User.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME') || 'yevheniii',
        password: configService.get<string>('DB_PASSWORD') || 'qwerty12345',
        database: configService.get<string>('DB_NAME') || 'nest_exhibitblog',
        entities: [User, Exhibit, Comment],
        synchronize: false,
      }),
    }),
    AuthModule,
    UserModule,
    ExhibitModule,
    CommentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
