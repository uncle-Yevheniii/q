import { ExhibitService } from '../exhibit/exhibit.service';
import { CommentController } from './comment.controller';
import { Exhibit } from '../exhibit/Exhibit.entity';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './Comment.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Exhibit])],
  controllers: [CommentController],
  providers: [CommentService, ExhibitService],
})
export class CommentModule {}
