import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStageService } from './application-stage.service';

describe('ApplicationStageService', () => {
  let service: ApplicationStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationStageService],
    }).compile();

    service = module.get<ApplicationStageService>(ApplicationStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
