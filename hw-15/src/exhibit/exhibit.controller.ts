import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExhibitParamDto } from './dto/exhibitParam.dto';
import { ExhibitQueryDto } from './dto/exhibitQuery.dto';
import { JwtGuard } from '../auth/strategy/jwt.guard';
import { plainToInstance } from 'class-transformer';
import { ExhibitService } from './exhibit.service';
import { ExhibitBodyDto } from './dto/exhibit.dto';
import { Exhibit } from './Exhibit.entity';
import { Request } from 'express';
import * as multer from 'multer';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import {
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Controller,
  UseGuards,
  HttpCode,
  Delete,
  Param,
  Query,
  Post,
  Body,
  Get,
  Req,
} from '@nestjs/common';
@Controller('exhibit')
export class ExhibitController {
  constructor(
    private readonly websocketGateway: WebsocketGateway,
    private readonly exhibitService: ExhibitService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all users exhibit with query params' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return exhibit list' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getExhibits(@Query() exhibitQuery: ExhibitQueryDto) {
    if (!exhibitQuery.page) exhibitQuery.page = 1;
    if (!exhibitQuery.limit) exhibitQuery.limit = 5;

    const { data, total } = await this.exhibitService.getExhibits(exhibitQuery);
    const transformedData = plainToInstance(Exhibit, data, { excludeExtraneousValues: true });

    return {
      data: transformedData,
      page: exhibitQuery.page,
      lastPage: Math.ceil(total / exhibitQuery.limit),
      total,
    };
  }

  @Get('/post/:exhibitID')
  @ApiOperation({ summary: 'Get exhibit by id' })
  @ApiParam({ name: 'exhibitID', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'Return exhibit' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Exhibit not found' })
  async getExhibitById(@Param() parm: ExhibitParamDto) {
    if (!parm['exhibitID']) throw new BadRequestException('You must provide either id');

    const exhibit = await this.exhibitService.getExhibitById(parm['exhibitID']);
    if (!exhibit) throw new NotFoundException('Exhibit not found');

    return plainToInstance(Exhibit, exhibit, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access - token')
  @Post('/')
  @ApiOperation({ summary: 'Create exhibit post' })
  @ApiResponse({ status: 201, description: 'Return created exhibit' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
    if (!user) throw new BadRequestException('Unauthorized');

    const cloudPhoto = await this.exhibitService.uploadImageBuffer(
      file.buffer,
      file.originalname,
      user['id'],
    );

    const exhibit = await this.exhibitService.createExhibit({
      userID: user['id'],
      userName: user['username'],
      imagePublicId: cloudPhoto.public_id,
      imageUrl: cloudPhoto.secure_url,
      description: data.description,
    });

    await this.websocketGateway.sendNotification({
      msg: `New exhibit created: ${exhibit.description}`,
      user: user['username'],
    });

    return plainToInstance(Exhibit, exhibit, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access - token')
  @ApiOperation({ summary: 'Get all exhibit authorized user with query params' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return exhibit list' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('/my')
  async getMyExhibits(@Query() exhibitQuery: ExhibitQueryDto, @Req() req: Request) {
    if (!exhibitQuery.page) exhibitQuery.page = 1;
    if (!exhibitQuery.limit) exhibitQuery.limit = 5;

    const user = req.user;
    if (!user) throw new BadRequestException('Unauthorized');

    const { data, total } = await this.exhibitService.getExhibitByUserId(exhibitQuery, user['id']);
    const transformedData = plainToInstance(Exhibit, data, { excludeExtraneousValues: true });

    return {
      data: transformedData,
      page: exhibitQuery.page,
      lastPage: Math.ceil(total / exhibitQuery.limit),
      total,
    };
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access - token')
  @Delete('/:exhibitID')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete exhibit by id' })
  @ApiParam({ name: 'exhibitID', required: true, type: Number })
  @ApiResponse({ status: 204, description: 'Deleted exhibit' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Exhibit not found' })
  async deleteExhibitById(@Param() parm: ExhibitParamDto, @Req() req: Request) {
    if (!parm['exhibitID']) throw new BadRequestException('You must provide either id');

    const user = req.user;
    if (!user) throw new BadRequestException('Unauthorized');

    const exhibit = await this.exhibitService.getExhibitById(parm['exhibitID']);
    if (!exhibit) throw new NotFoundException('Exhibit not found');
    if (exhibit.userID !== user['id']) throw new BadRequestException('Unauthorized');

    await this.exhibitService.deleteExhibitById(exhibit);
  }
}
