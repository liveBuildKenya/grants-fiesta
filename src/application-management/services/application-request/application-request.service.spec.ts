import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationRequestService } from './application-request.service';

describe('ApplicationRequestService', () => {
  let service: ApplicationRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationRequestService],
    }).compile();

    service = module.get<ApplicationRequestService>(ApplicationRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
