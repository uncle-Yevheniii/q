import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './Comment.entity';
import { Exhibit } from '../exhibit/Exhibit.entity';
import { ExhibitService } from '../exhibit/exhibit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Exhibit])],
  controllers: [CommentController],
  providers: [CommentService, ExhibitService],
})
export class CommentModule {}
