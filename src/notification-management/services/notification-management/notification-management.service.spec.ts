import { Test, TestingModule } from '@nestjs/testing';
import { NotificationManagementService } from './notification-management.service';

describe('NotificationManagementService', () => {
  let service: NotificationManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationManagementService],
    }).compile();

    service = module.get<NotificationManagementService>(NotificationManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
