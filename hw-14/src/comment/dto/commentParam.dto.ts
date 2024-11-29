import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CommentParamDto {
  @ApiProperty({ description: 'Exhibit ID' })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  exhibitID: number;

  @ApiProperty({ description: 'Comment ID' })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  commentID: number;
}
