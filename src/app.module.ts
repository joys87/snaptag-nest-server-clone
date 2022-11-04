import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TeamsController } from './teams/teams.controller';
import { TeamsModule } from './teams/teams.module';
import { TeamsService } from './teams/teams.service';
import { ProjectsModule } from './projects/projects.module';
import { VersionsModule } from './versions/versions.module';
import { CountriesModule } from './countries/countries.module';
import { IndustriesModule } from './industries/industries.module';
import { MainCategoriesModule } from './main-categories/main-categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { BmsModule } from './bms/bms.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

const domainModules = [
  IndustriesModule,
  ProjectsModule,
  TeamsModule,
  VersionsModule,
  CountriesModule,
  MainCategoriesModule,
  SubCategoriesModule,
  BmsModule,
];

const utilModule = [PrismaModule, UploadImageModule];

@Module({
  imports: [
    ...domainModules,
    ...utilModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
