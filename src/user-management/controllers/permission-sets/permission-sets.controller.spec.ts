import { Test, TestingModule } from '@nestjs/testing';
import { PermissionSetsController } from './permission-sets.controller';

describe('PermissionSets Controller', () => {
  let controller: PermissionSetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionSetsController],
    }).compile();

    controller = module.get<PermissionSetsController>(PermissionSetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
