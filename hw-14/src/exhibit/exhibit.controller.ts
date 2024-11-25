import { Controller, Get, Query } from '@nestjs/common';
import { ExhibitService } from './exhibit.service';
import { ExhibitQueryDto } from './dto/exhibitQuery.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ExhibitResponseDto } from './dto/exhibit.dto';

@Controller('exhibit')
export class ExhibitController {
  constructor(private readonly exhibitService: ExhibitService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all users exhibit with query params' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return exhibit list' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getExhibits(@Query() exhibitQuery: ExhibitQueryDto) {
    const exhibit = await this.exhibitService.getExhibits(exhibitQuery);

    return exhibit;
  }
}
