import { Test, TestingModule } from '@nestjs/testing';
import { ClarificationManagementService } from './clarification-management.service';

describe('ClarificationManagementService', () => {
  let service: ClarificationManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClarificationManagementService],
    }).compile();

    service = module.get<ClarificationManagementService>(ClarificationManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
