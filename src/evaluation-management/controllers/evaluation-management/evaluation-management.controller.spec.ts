import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationManagementController } from './evaluation-management.controller';

describe('EvaluationManagement Controller', () => {
  let controller: EvaluationManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationManagementController],
    }).compile();

    controller = module.get<EvaluationManagementController>(EvaluationManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
