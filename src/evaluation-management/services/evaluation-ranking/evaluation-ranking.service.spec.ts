import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationRankingService } from './evaluation-ranking.service';

describe('EvaluationRankingService', () => {
  let service: EvaluationRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationRankingService],
    }).compile();

    service = module.get<EvaluationRankingService>(EvaluationRankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
