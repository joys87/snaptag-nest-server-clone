import { Test, TestingModule } from '@nestjs/testing';
import { BmsService } from './bms.service';

describe('BmsService', () => {
  let service: BmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BmsService],
    }).compile();

    service = module.get<BmsService>(BmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
