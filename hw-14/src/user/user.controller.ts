import { Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserCreateDto, UserQueryDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { User } from './User.entity';

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
      throw new NotFoundException('You must provide either id or username');

    const user = userQuery?.id
      ? await this.userService.getUserById(userQuery?.id)
      : await this.userService.getUserByUsername(userQuery?.username);
    if (!user) throw new NotFoundException('User not found');

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create user' })
  // @ApiBody()
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createUser(@Body() data: UserCreateDto) {
    const user = await this.userService.createUser(data);

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }
}
