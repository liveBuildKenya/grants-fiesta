import { Test, TestingModule } from '@nestjs/testing';
import { CommentManagementService } from './comment-management.service';

describe('CommentManagementService', () => {
  let service: CommentManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentManagementService],
    }).compile();

    service = module.get<CommentManagementService>(CommentManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
