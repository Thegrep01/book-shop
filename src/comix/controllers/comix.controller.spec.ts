import { Test, TestingModule } from '@nestjs/testing';
import { ComixController } from './comix.controller';

describe('Comix Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ComixController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ComixController = module.get<ComixController>(ComixController);
    expect(controller).toBeDefined();
  });
});
