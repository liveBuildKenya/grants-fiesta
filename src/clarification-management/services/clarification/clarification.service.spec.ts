import { Test, TestingModule } from '@nestjs/testing';
import { ClarificationService } from './clarification.service';

describe('ClarificationService', () => {
  let service: ClarificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClarificationService],
    }).compile();

    service = module.get<ClarificationService>(ClarificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
