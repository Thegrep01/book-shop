import { Test, TestingModule } from '@nestjs/testing';
import { MagazineController } from './magazine.controller';

describe('Magazine Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MagazineController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MagazineController = module.get<MagazineController>(MagazineController);
    expect(controller).toBeDefined();
  });
});
