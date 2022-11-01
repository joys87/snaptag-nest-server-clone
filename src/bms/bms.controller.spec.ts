import { Test, TestingModule } from '@nestjs/testing';
import { BmsController } from './bms.controller';

describe('BmsController', () => {
  let controller: BmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BmsController],
    }).compile();

    controller = module.get<BmsController>(BmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
