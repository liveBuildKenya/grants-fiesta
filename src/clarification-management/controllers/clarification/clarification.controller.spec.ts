import { Test, TestingModule } from '@nestjs/testing';
import { ClarificationController } from './clarification.controller';

describe('Clarification Controller', () => {
  let controller: ClarificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClarificationController],
    }).compile();

    controller = module.get<ClarificationController>(ClarificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
