import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../auth/strategy/jwt.guard';
import { Request } from 'express';
import { ExhibitService } from '../exhibit/exhibit.service';
import { ExhibitParamDto } from '../exhibit/dto/exhibitParam.dto';
import { CommentBodyDto } from './dto/commentBody.dto';
import { CommentService } from './comment.service';
import { plainToInstance } from 'class-transformer';
import { Comment } from './Comment.entity';
import { CommentQueryDto } from './dto/commentQuery.dto';

@Controller('/exhibit/:id/comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly exhibitService: ExhibitService,
  ) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access - token')
  @ApiOperation({ summary: 'Create comment current exhibit' })
  @ApiResponse({ status: 201, description: 'Return created exhibit comment' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('/')
  async createComment(@Param() parm: ExhibitParamDto, @Body() data: CommentBodyDto) {
    if (!parm['id']) throw new BadRequestException('You must provide either id');

    const exhibit = await this.exhibitService.getExhibitById(parm.id);
    if (!exhibit) throw new NotFoundException('Exhibit not found');

    const comment = await this.commentService.createComment(exhibit['id'], data.comment);

    return plainToInstance(Comment, comment, { excludeExtraneousValues: true });
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all comments current exhibit with query params' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return exhibit list' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getComments(@Query() commentQuery: CommentQueryDto, @Param() parm: ExhibitParamDto) {
    if (!commentQuery.page) commentQuery.page = 1;
    if (!commentQuery.limit) commentQuery.limit = 5;
    if (!parm['id']) throw new BadRequestException('You must provide either id');

    const exhibit = await this.exhibitService.getExhibitById(parm.id);
    if (!exhibit) throw new NotFoundException('Exhibit not found');

    const { data, total } = await this.commentService.getComments(commentQuery, exhibit['id']);
    const transformedData = plainToInstance(Comment, data, { excludeExtraneousValues: true });

    return {
      data: transformedData,
      page: commentQuery.page,
      lastPage: Math.ceil(total / commentQuery.limit),
      total,
    };
  }
}
