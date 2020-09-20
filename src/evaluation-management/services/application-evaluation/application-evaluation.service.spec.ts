import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationEvaluationService } from './application-evaluation.service';

describe('ApplicationEvaluationService', () => {
  let service: ApplicationEvaluationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationEvaluationService],
    }).compile();

    service = module.get<ApplicationEvaluationService>(ApplicationEvaluationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
