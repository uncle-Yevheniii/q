import { Module } from '@nestjs/common';
import { ExhibitController } from './exhibit.controller';
import { ExhibitService } from './exhibit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/User.entity';
import { Exhibit } from './Exhibit.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit, User]), ConfigModule],
  controllers: [ExhibitController],
  providers: [ExhibitService],
})
export class ExhibitModule {}
