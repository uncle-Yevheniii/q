import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsPositive, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UserQueryDto {
  @ApiProperty({ example: '', description: 'Unique user - ID ( example: 1 )' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  id?: number;

  @ApiProperty({ example: '', description: 'Unique user - username ( example: "username" )' })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(50, { message: 'Username is too long' })
  username?: string;
}
