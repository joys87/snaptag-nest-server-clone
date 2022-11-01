import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, ProjectStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateProjectsBodyRequestDto } from './dtos/snaptag/create-projects-request.dto';
import { ProjectsError } from './error';

@Injectable()
export class ProjectsService {
  constructor(readonly prismaService: PrismaService) {}

  public async create(
    dto: Omit<CreateProjectsBodyRequestDto, 'bannerImage'>,
    bannerImage?: Express.Multer.File,
  ) {
    const {
      versionId,
      countryId,
      industryId,
      mainCategoryId,
      subCategoryId,
      teamId,
      bmId,
    } = dto;

    if (!mainCategoryId && subCategoryId) {
      throw new ForbiddenException(ProjectsError.VALIDATE_MAIN_SUB_CATEGORY);
    }

    const {
      code,
      versionCode,
      countryCode,
      industryCode,
      teamCode,
      mainCategoryCode,
      subCategoryCode,
      bmCode,
    } = await this.getCodesForCreate({
      versionId,
      countryId,
      industryId,
      mainCategoryId,
      subCategoryId,
      teamId,
      bmId,
    });

    const data: Prisma.ProjectsCreateInput = {
      bannerImage: await this.getBannerImageUrl(bannerImage),
      status: ProjectStatus.ACTIVE,
      code,
      versionCode,
      countryCode,
      industryCode,
      teamCode,
      mainCategoryCode,
      subCategoryCode,
      bmCode,
      ...dto,
    };

    return this.prismaService.create(data);
  }
}
