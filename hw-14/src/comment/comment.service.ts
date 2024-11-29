import { CommentQueryDto } from './dto/commentQuery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './Comment.entity';
import { Repository } from 'typeorm';
import { ExhibitService } from '../exhibit/exhibit.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    private readonly exhibitService: ExhibitService,
  ) {}

  async getCommentById(commentID: number): Promise<Comment | null> {
    return await this.commentRepository.findOne({ where: { id: commentID } });
  }

  async createComment(exhibitID: number, comment: string): Promise<Comment | null> {
    console.log('exhibitID:', exhibitID, typeof exhibitID);

    await this.exhibitService.updateExhibitCommentIncrement(exhibitID);
    return await this.commentRepository.save({ exhibitID, comment });
  }

  /**
   * Retrieves a paginated list of comments for a specific exhibit.
   *
   * @param {CommentQueryDto} commentQuery - The query parameters for pagination.
   * @param {number} exhibitID - The ID of the exhibit to retrieve comments for.
   * @returns {Promise<{ data: Array<Comment>, total: number }>} - A promise that resolves to an object containing the list of comments and the total count.
   */
  async getComments(
    commentQuery: CommentQueryDto,
    exhibitID: number,
  ): Promise<{ data: Array<Comment>; total: number }> {
    const { limit, page } = commentQuery;

    const [data, total] = await this.commentRepository.findAndCount({
      where: { exhibitID },
      skip: limit * (page - 1),
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async deleteComment(comment: Comment, exhibitID: number): Promise<void> {
    await this.exhibitService.updateExhibitCommentDecrement(exhibitID);
    await this.commentRepository.remove(comment);
  }
}
