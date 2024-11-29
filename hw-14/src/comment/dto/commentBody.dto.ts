import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CommentBodyDto {
  @ApiProperty({ description: 'Exhibit description' })
  @IsString()
  @MinLength(6)
  @MaxLength(512)
  comment: string;
}
