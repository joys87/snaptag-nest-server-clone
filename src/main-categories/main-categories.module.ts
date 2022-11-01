import { Module } from '@nestjs/common';
import { MainCategoriesController } from './main-categories.controller';
import { MainCategoriesRepository } from './main-categories.repository';
import { MainCategoriesService } from './main-categories.service';

@Module({
  controllers: [MainCategoriesController],
  providers: [MainCategoriesService, MainCategoriesRepository],
  exports: [MainCategoriesService],
})
export class MainCategoriesModule {}
