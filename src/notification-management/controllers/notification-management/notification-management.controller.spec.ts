import { Test, TestingModule } from '@nestjs/testing';
import { NotificationManagementController } from './notification-management.controller';

describe('NotificationManagement Controller', () => {
  let controller: NotificationManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationManagementController],
    }).compile();

    controller = module.get<NotificationManagementController>(NotificationManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
