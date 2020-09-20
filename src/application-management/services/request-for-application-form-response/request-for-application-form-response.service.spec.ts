import { Test, TestingModule } from '@nestjs/testing';
import { RequestForApplicationFormResponseService } from './request-for-application-form-response.service';

describe('RequestForApplicationFormResponseService', () => {
  let service: RequestForApplicationFormResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestForApplicationFormResponseService],
    }).compile();

    service = module.get<RequestForApplicationFormResponseService>(RequestForApplicationFormResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
