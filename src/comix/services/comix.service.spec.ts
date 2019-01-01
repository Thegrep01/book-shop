import { Test, TestingModule } from '@nestjs/testing';
import { ComixService } from './comix.service';

describe('ComixService', () => {
  let service: ComixService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComixService],
    }).compile();
    service = module.get<ComixService>(ComixService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
