import { Test, TestingModule } from '@nestjs/testing';
import { ActionPermissionService } from './action-permission.service';

describe('ActionPermissionService', () => {
  let service: ActionPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionPermissionService],
    }).compile();

    service = module.get<ActionPermissionService>(ActionPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
