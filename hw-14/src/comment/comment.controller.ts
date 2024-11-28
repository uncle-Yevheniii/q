import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../auth/strategy/jwt.guard';
import { Request } from 'express';
import { ExhibitService } from '../exhibit/exhibit.service';
import { ExhibitParamDto } from '../exhibit/dto/exhibitParam.dto';
import { CommentBodyDto } from './dto/commentBody.dto';
import { CommentService } from './comment.service';
import { plainToInstance } from 'class-transformer';
import { Comment } from './Comment.entity';

@Controller('/exhibit/:id/comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly exhibitService: ExhibitService,
  ) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access - token')
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
  async getComments(@Param() parm: ExhibitParamDto) {
    if (!parm['id']) throw new BadRequestException('You must provide either id');

    const exhibit = await this.exhibitService.getExhibitById(parm.id);
    if (!exhibit) throw new NotFoundException('Exhibit not found');

    const { data, total } = await this.commentService.getComments(exhibit['id']);
    const transformedData = plainToInstance(Comment, data, { excludeExtraneousValues: true });

    return { data: transformedData, total };
  }
}
