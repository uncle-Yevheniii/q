import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitService } from './exhibit.service';

describe('ExhibitService', () => {
  let service: ExhibitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExhibitService],
    }).compile();

    service = module.get<ExhibitService>(ExhibitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
