import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationTemplateController } from './application-template.controller';

describe('ApplicationTemplate Controller', () => {
  let controller: ApplicationTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationTemplateController],
    }).compile();

    controller = module.get<ApplicationTemplateController>(ApplicationTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
