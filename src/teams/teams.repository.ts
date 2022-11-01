import { Injectable } from '@nestjs/common';
import { Prisma, Status, Teams } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import * as dayjs from 'dayjs';

@Injectable()
export class TeamsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  dbNow = (): Date => dayjs().add(9, 'hour').toDate();

  /* getTeams는 prismaService 부분만 추출해서 teamsService 와 통합함*/

  //   public getTeams(page: number, pageSize: number): Promise<Teams[]> {
  //     return this.prismaService.teams.findMany({
  //       skip: (page - 1) * pageSize,
  //       take: pageSize,
  //       where: {
  //         status: Status.ACTIVE,
  //       },
  //       orderBy: {
  //         created: 'desc',
  //       },
  //     });
  //   }

  public create(
    // data: Omit<Prisma.TeamsUncheckedCreateInput, 'created' | 'modified'>,
    data: Prisma.TeamsUncheckedCreateInput,
  ) {
    return this.prismaService.teams.create({
      data: {
        created: this.dbNow(),
        modified: this.dbNow(),
        ...data,
      },
    });
  }
}
