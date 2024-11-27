import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class ExhibitParamDto {
  @ApiProperty({ description: 'Exhibit ID' })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  id: number;
}
