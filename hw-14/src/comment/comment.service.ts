import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './Comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  async createComment(exhibitID: number, comment: string) {
    return await this.commentRepository.save({ exhibitID, comment });
  }

  async getComments(exhibitID: number) {
    const [data, total] = await this.commentRepository.findAndCount({
      where: { exhibitID },
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }
}
