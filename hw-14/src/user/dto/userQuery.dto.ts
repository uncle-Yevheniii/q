import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsPositive, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UserQueryDTO {
  @ApiProperty({ example: 1, description: 'Unique user - ID' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  id?: number;

  @ApiProperty({ example: 'username', description: 'Unique user - username' })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(50, { message: 'Username is too long' })
  username?: string;
}
