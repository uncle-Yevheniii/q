import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserCreateDto, UserQueryDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { User } from './User.entity';
import { JwtGuard } from './strategy/jwt.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find user by id or username' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'username', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Return user' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found user' })
  async getUser(@Query() userQuery: UserQueryDTO) {
    if (!userQuery.id && !userQuery.username)
      throw new BadRequestException('You must provide either id or username');

    const user = userQuery?.id
      ? await this.userService.getUserById(userQuery?.id)
      : await this.userService.getUserByUsername(userQuery?.username);
    if (!user) throw new NotFoundException('User not found');

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({ status: 201, description: 'Sign up user successful' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signupUser(@Body() data: UserCreateDto) {
    const user = await this.userService.createUser(data);

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @Post('/login')
  @ApiOperation({ summary: 'Log in user' })
  @ApiResponse({ status: 201, description: 'Log in user successful' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found user' })
  async loginUser(@Body() data: UserCreateDto) {
    const user = await this.userService.authenticateUser(data);

    return plainToInstance(User, user, {
      excludeExtraneousValues: true,
      groups: ['includeAccessToken'],
    });
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
