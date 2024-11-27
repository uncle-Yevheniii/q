import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class JwtPayloadDto {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  sub?: number;

  @IsString()
  username?: string;

  @IsString()
  iat: number;

  @IsString()
  exp: number;
}
