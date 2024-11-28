import { CommentQueryDto } from './dto/commentQuery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Comment } from './Comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}

  /**
   * Creates a new comment for a given exhibit.
   *
   * @param exhibitID - The ID of the exhibit to which the comment belongs.
   * @param comment - The content of the comment to be created.
   * @returns {Promise<Comment | null>} A promise that resolves to the saved comment object.
   */
  async createComment(exhibitID: number, comment: string): Promise<Comment | null> {
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
}
