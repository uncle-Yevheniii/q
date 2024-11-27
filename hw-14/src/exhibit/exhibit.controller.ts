import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExhibitService } from './exhibit.service';
import { ExhibitQueryDto } from './dto/exhibitQuery.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Request } from 'express';
import { JwtGuard } from '../auth/strategy/jwt.guard';
import { plainToInstance } from 'class-transformer';
import { Exhibit } from './Exhibit.entity';
import { ExhibitBodyDto } from './dto/exhibit.dto';

@Controller('exhibit')
export class ExhibitController {
  constructor(private readonly exhibitService: ExhibitService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all users exhibit with query params' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return exhibit list' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getExhibits(@Query() exhibitQuery: ExhibitQueryDto) {
    const { data, total } = await this.exhibitService.getExhibits(exhibitQuery);
    const transformedData = plainToInstance(Exhibit, data, { excludeExtraneousValues: true });

    return { data: transformedData, total };
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access - token')
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        description: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async createExhibit(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body() data: ExhibitBodyDto,
  ) {
    if (!file) throw new BadRequestException('File is required');

    const user = req.user;
    const cloudPhoto = await this.exhibitService.uploadImageBuffer(file.buffer, file.fieldname);

    const exhibit = await this.exhibitService.createExhibit({
      userID: user['id'],
      imagePublicId: cloudPhoto.public_id,
      imageUrl: cloudPhoto.secure_url,
      description: data.description,
    });
    return plainToInstance(Exhibit, exhibit, { excludeExtraneousValues: true });
  }
}
