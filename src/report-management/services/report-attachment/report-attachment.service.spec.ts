import { Test, TestingModule } from '@nestjs/testing';
import { ReportAttachmentService } from './report-attachment.service';

describe('ReportAttachmentService', () => {
  let service: ReportAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportAttachmentService],
    }).compile();

    service = module.get<ReportAttachmentService>(ReportAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
