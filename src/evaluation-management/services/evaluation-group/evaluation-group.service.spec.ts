import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationGroupService } from './evaluation-group.service';

describe('EvaluationGroupService', () => {
  let service: EvaluationGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationGroupService],
    }).compile();

    service = module.get<EvaluationGroupService>(EvaluationGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
