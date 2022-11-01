import { Module } from '@nestjs/common';
import { BmsModule } from 'src/bms/bms.module';
import { CountriesModule } from 'src/countries/countries.module';
import { IndustriesModule } from 'src/industries/industries.module';
import { MainCategoriesModule } from 'src/main-categories/main-categories.module';
import { SubCategoriesModule } from 'src/sub-categories/sub-categories.module';
import { TeamsModule } from 'src/teams/teams.module';
import { IUploadImage } from 'src/upload-image/upload-image.interface';
import { UploadImageService } from 'src/upload-image/upload-image.service';
import { VersionsModule } from 'src/versions/versions.module';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './projects.repository';
import { CalculateCodesService, ProjectsService } from './service';

@Module({
  imports: [
    VersionsModule,
    CountriesModule,
    IndustriesModule,
    MainCategoriesModule,
    SubCategoriesModule,
    TeamsModule,
    BmsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, CalculateCodesService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
