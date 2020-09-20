import { Test, TestingModule } from '@nestjs/testing';
import { WhistleBlowController } from './whistle-blow.controller';

describe('WhistleBlow Controller', () => {
  let controller: WhistleBlowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhistleBlowController],
    }).compile();

    controller = module.get<WhistleBlowController>(WhistleBlowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
