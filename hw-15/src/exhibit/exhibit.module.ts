import { WebsocketGateway } from '../websocket/websocket.gateway';
import { ExhibitController } from './exhibit.controller';
import { Comment } from '../comment/Comment.entity';
import { ExhibitService } from './exhibit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../user/User.entity';
import { Exhibit } from './Exhibit.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit, User, Comment]), ConfigModule],
  controllers: [ExhibitController],
  providers: [ExhibitService, WebsocketGateway],
  exports: [ExhibitService],
})
export class ExhibitModule {}
