import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExhibitBodyDto {
  @ApiProperty({ description: 'Exhibit description' })
  @IsString()
  @MinLength(6)
  @MaxLength(512)
  description: string;
}

export class ExhibitCreateDto {
  @IsString()
  userID: number;

  @IsString()
  userName: string;

  @IsString()
  imagePublicId: string;

  @IsString()
  imageUrl: string;

  @IsString()
  description: string;
}
