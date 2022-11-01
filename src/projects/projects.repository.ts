import { Prisma, Projects } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from 'src/prisma';
import { IGetMaxCodeByIdsOptions, IGetMaxTeamCodeByIdsOptions } from './type';

export class ProjectsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  dbNow = (): Date => dayjs().add(9, 'hour').toDate();

  public create(
    data: Omit<Prisma.ProjectsCreateInput, 'created' | 'modified'>,
  ): Promise<Projects> {
    return this.prismaService.projects.create({
      data: {
        created: this.dbNow(),
        modified: this.dbNow(),
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
}
