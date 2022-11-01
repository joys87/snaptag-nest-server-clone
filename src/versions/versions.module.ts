import { Module } from '@nestjs/common';
import { VersionsController } from './versions.controller';
import { VersionsRepository } from './versions.repository';
import { VersionsService } from './versions.service';

@Module({
  controllers: [VersionsController],
  providers: [VersionsService, VersionsRepository],
  exports: [VersionsService],
})
export class VersionsModule {}
