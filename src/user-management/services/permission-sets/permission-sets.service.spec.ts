import { Test, TestingModule } from '@nestjs/testing';
import { PermissionSetsService } from './permission-sets.service';

describe('PermissionSetsService', () => {
  let service: PermissionSetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionSetsService],
    }).compile();

    service = module.get<PermissionSetsService>(PermissionSetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
