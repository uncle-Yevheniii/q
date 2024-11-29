import { Module } from '@nestjs/common';
import { ExhibitController } from './exhibit.controller';
import { ExhibitService } from './exhibit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/User.entity';
import { Exhibit } from './Exhibit.entity';
import { ConfigModule } from '@nestjs/config';
import { Comment } from '../comment/Comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit, User, Comment]), ConfigModule],
  controllers: [ExhibitController],
  providers: [ExhibitService],
  exports: [ExhibitService],
})
export class ExhibitModule {}
