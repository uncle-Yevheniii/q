import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsString, IsPositive, IsOptional } from 'class-validator';

export class UserQueryDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  id?: number;

  @IsOptional()
  @IsString()
  username?: string;
}
