import { Test, TestingModule } from '@nestjs/testing';
import { ExhibitController } from './exhibit.controller';

describe('ExhibitController', () => {
  let controller: ExhibitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExhibitController],
    }).compile();

    controller = module.get<ExhibitController>(ExhibitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
