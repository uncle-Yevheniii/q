import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserParamsDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { User } from './User.entity';
import { Request } from 'express';
import { JwtGuard } from '../auth/strategy/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: 'Find user by id or username' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'username', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Return user' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found user' })
  async getUser(@Query() userQuery: UserParamsDto) {
    if (!userQuery.id && !userQuery.username)
      throw new BadRequestException('You must provide either id or username');

    const user = userQuery?.id
      ? await this.userService.getUserById(userQuery?.id)
      : await this.userService.getUserByUsername(userQuery?.username);
    if (!user) throw new NotFoundException('User not found');

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('access - token')
  @ApiOperation({ summary: 'Get information about the current user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the information about the current user',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('/me')
  async getMe(@Req() req: Request) {
    return plainToInstance(User, req.user, {
      excludeExtraneousValues: true,
      groups: ['includeAccessToken'],
    });
  }
}
