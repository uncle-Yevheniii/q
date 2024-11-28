import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './Comment.entity';
import { Repository } from 'typeorm';
import { CommentQueryDto } from './dto/commentQuery.dto';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  async createComment(exhibitID: number, comment: string) {
    return await this.commentRepository.save({ exhibitID, comment });
  }

  async getComments(commentQuery: CommentQueryDto, exhibitID: number) {
    const { limit, page } = commentQuery;

    const [data, total] = await this.commentRepository.findAndCount({
      where: { exhibitID },
      skip: limit * (page - 1),
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }
}
