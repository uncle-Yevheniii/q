import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { User } from './user/User.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExhibitModule } from './exhibit/exhibit.module';
import { Exhibit } from './exhibit/Exhibit.entity';

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
        entities: [User, Exhibit],
        synchronize: false,
      }),
    }),
    UserModule,
    ExhibitModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
