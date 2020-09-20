import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationManagementService } from './application-management.service';

describe('ApplicationManagementService', () => {
  let service: ApplicationManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationManagementService],
    }).compile();

    service = module.get<ApplicationManagementService>(ApplicationManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
