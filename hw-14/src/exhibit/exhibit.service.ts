import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exhibit } from './Exhibit.entity';
import { Repository } from 'typeorm';
import { ExhibitQueryDto } from './dto/exhibitQuery.dto';

@Injectable()
export class ExhibitService {
  constructor(@InjectRepository(Exhibit) private readonly exhibitRepository: Repository<Exhibit>) {}

  async getExhibits(exhibitQuery: ExhibitQueryDto) {
    const { limit = 5, page = 1 } = exhibitQuery;
    const [data, total] = await this.exhibitRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }
}
