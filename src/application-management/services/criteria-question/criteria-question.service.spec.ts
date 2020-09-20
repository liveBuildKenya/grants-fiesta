import { Test, TestingModule } from '@nestjs/testing';
import { CriteriaQuestionService } from './criteria-question.service';

describe('CriteriaQuestionService', () => {
  let service: CriteriaQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriteriaQuestionService],
    }).compile();

    service = module.get<CriteriaQuestionService>(CriteriaQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
