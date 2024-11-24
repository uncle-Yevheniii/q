import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'username', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @ApiResponse({ status: 404, description: 'Not found user' })
  async getAllUsers(@Query('id') id?: number, @Query('username') username?: string) {}
}
