import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthenticationDto {
  @ApiProperty({ example: 'username', description: 'Enter username' })
  @IsString()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(50, { message: 'Username is too long' })
  username: string;

  @ApiProperty({ example: 'password', description: 'Enter password' })
  @IsString()
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  @Matches(
    new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,20}$/),
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  password: string;
}
