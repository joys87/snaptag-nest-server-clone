import { Module } from '@nestjs/common';
import { UploadImageModule } from 'src/upload-image/upload-image.module';
import { UploadImageService } from 'src/upload-image/upload-image.service';
import { TeamsController } from './teams.controller';
import { TeamsRepository } from './teams.repository';
import { TeamsService } from './teams.service';

@Module({
  imports: [UploadImageModule],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
  exports: [TeamsService],
})
export class TeamsModule {}
