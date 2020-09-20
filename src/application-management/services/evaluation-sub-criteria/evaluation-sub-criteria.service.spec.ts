import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationSubCriteriaService } from './evaluation-sub-criteria.service';

describe('EvaluationSubCriteriaService', () => {
  let service: EvaluationSubCriteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationSubCriteriaService],
    }).compile();

    service = module.get<EvaluationSubCriteriaService>(EvaluationSubCriteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
