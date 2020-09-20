import { Test, TestingModule } from '@nestjs/testing';
import { TemplateCustomPropertiesService } from './template-custom-properties.service';

describe('TemplateCustomPropertiesService', () => {
  let service: TemplateCustomPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateCustomPropertiesService],
    }).compile();

    service = module.get<TemplateCustomPropertiesService>(TemplateCustomPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
