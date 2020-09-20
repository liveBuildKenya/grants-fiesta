import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationManagementService } from './evaluation-management.service';

describe('EvaluationManagementService', () => {
  let service: EvaluationManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationManagementService],
    }).compile();

    service = module.get<EvaluationManagementService>(EvaluationManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
