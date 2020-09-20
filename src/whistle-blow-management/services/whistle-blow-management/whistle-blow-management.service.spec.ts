import { Test, TestingModule } from '@nestjs/testing';
import { WhistleBlowManagementService } from './whistle-blow-management.service';

describe('WhistleBlowManagementService', () => {
  let service: WhistleBlowManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhistleBlowManagementService],
    }).compile();

    service = module.get<WhistleBlowManagementService>(WhistleBlowManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
