import { dbNow } from '@app/utils/date';
import { Injectable } from '@nestjs/common';
import { Prisma, Projects } from '@prisma/client';

import { PrismaService } from 'src/prisma';
import { GetProjectsQueryRequestDto } from './dtos/snaptag/get-projects-request.dto';
import { GetProjectsResponseDto } from './dtos/snaptag/get-projects-response.dto';
import {
  IGetMaxCodeByIdsOptions,
  IGetMaxTeamCodeByIdsOptions,
  TGetProjects,
} from './type';

@Injectable()
export class ProjectsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(
    data: Omit<Prisma.ProjectsCreateInput, 'created' | 'modified'>,
  ): Promise<Projects> {
    return this.prismaService.projects.create({
      data: {
        created: dbNow(),
        modified: dbNow(),
        ...data,
      },
    });
  }

  public getByTeamId(teamId: number): Promise<Projects | null> {
    return this.prismaService.projects.findFirst({
      where: {
        teamId,
      },
    });
  }

  public getMaxTeamCodeByIds({
    versionId,
    countryId,
    industryId,
    mainCategoryId,
    subCategoryId,
  }: IGetMaxTeamCodeByIdsOptions) {
    return this.prismaService.projects.aggregate({
      _max: {
        teamCode: true,
      },
      where: {
        versionId,
        countryId,
        industryId,
        mainCategoryId,
        subCategoryId,
      },
    });
  }

  public getMaxCodeByIds({
    versionId,
    countryId,
    industryId,
    teamId,
    mainCategoryId,
    subCategoryId,
  }: IGetMaxCodeByIdsOptions) {
    return this.prismaService.projects.aggregate({
      _max: {
        code: true,
      },
      where: {
        versionId,
        countryId,
        industryId,
        teamId,
        mainCategoryId,
        subCategoryId,
      },
    });
  }

  public findByConditions(
    options: GetProjectsQueryRequestDto,
  ): Promise<TGetProjects> {
    const {
      page,
      pageSize,
      status,
      projectId: id,
      versionId,
      countryId,
      industryId,
      teamId,
      mainCategoryId,
      subCategoryId,
      title,
      isVariable,
    } = options;
    const where: Prisma.ProjectsWhereInput = {
      id,
      status,
      versionId,
      countryId,
      industryId,
      teamId,
      mainCategoryId,
      subCategoryId,
      title: {
        contains: title,
      },
      industries: {
        isVariable,
      },
      bmCode: {
        in: null,
      },
    };

    return this.prismaService.$transaction([
      this.prismaService.projects.findMany({
        skip: pageSize * (page - 1),
        take: pageSize,
        where,
        orderBy: {
          created: 'desc',
        },
        include: {
          industries: true,
        },
      }),
      this.prismaService.projects.count({
        where,
      }),
    ]);
  }
}
