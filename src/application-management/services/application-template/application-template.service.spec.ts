import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationTemplateService } from './application-template.service';

describe('ApplicationTemplateService', () => {
  let service: ApplicationTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationTemplateService],
    }).compile();

    service = module.get<ApplicationTemplateService>(ApplicationTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
