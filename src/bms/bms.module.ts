import { Module } from '@nestjs/common';
import { BmsController } from './bms.controller';
import { BmsRepository } from './bms.repository';
import { BmsService } from './bms.service';

@Module({
  controllers: [BmsController],
  providers: [BmsService, BmsRepository],
  exports: [BmsService],
})
export class BmsModule {}
