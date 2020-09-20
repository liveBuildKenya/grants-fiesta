import { Test, TestingModule } from '@nestjs/testing';
import { ReportingTemplateService } from './reporting-template.service';

describe('ReportingTemplateService', () => {
  let service: ReportingTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportingTemplateService],
    }).compile();

    service = module.get<ReportingTemplateService>(ReportingTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
