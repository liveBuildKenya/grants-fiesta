import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationFormTemplateService } from './application-form-template.service';

describe('ApplicationFormTemplateService', () => {
  let service: ApplicationFormTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationFormTemplateService],
    }).compile();

    service = module.get<ApplicationFormTemplateService>(ApplicationFormTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
