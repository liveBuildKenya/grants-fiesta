import { Test, TestingModule } from '@nestjs/testing';
import { WhistleBlowService } from './whistle-blow.service';

describe('WhistleBlowService', () => {
  let service: WhistleBlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhistleBlowService],
    }).compile();

    service = module.get<WhistleBlowService>(WhistleBlowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
