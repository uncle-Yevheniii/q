import { AuthenticationDto, LoginResponseDto } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up user in service' })
  @ApiResponse({ status: 201, description: 'Sign up user successful' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signupUser(@Body() data: AuthenticationDto) {
    const user = await this.authService.createUser(data);

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @Post('/login')
  @ApiOperation({ summary: 'Log in user in service' })
  @ApiResponse({ status: 201, description: 'Log in user successful' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found user' })
  async loginUser(@Body() data: AuthenticationDto) {
    const user = await this.authService.authenticateUser(data);

    return plainToInstance(LoginResponseDto, user, { excludeExtraneousValues: true });
  }
}
