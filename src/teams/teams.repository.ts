import { dbNow } from '@app/utils/date';
import { Injectable } from '@nestjs/common';
import { Prisma, Status, Teams } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class TeamsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /* getTeams는 prismaService 부분만 추출해서 teamsService 와 통합함*/

  public getTeams(page: number, pageSize: number): Promise<Teams[]> {
    return this.prismaService.teams.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        status: Status.ACTIVE,
      },
      orderBy: {
        created: 'desc',
      },
    });
  }

  public create(
    data: Omit<Prisma.TeamsUncheckedCreateInput, 'created' | 'modified'>,
    // data: Prisma.TeamsUncheckedCreateInput,
  ) {
    return this.prismaService.teams.create({
      data: {
        created: dbNow(),
        modified: dbNow(),
        ...data,
      },
    });
  }
}
