import { Injectable } from '@nestjs/common';
import { Versions } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class VersionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getVersions(): Promise<Versions[]> {
    return this.prismaService.versions.findMany({
      orderBy: {
        code: 'asc',
      },
    });
  }

  public getById(id: number): Promise<Versions | null> {
    return this.prismaService.versions.findUnique({
      where: {
        id,
      },
    });
  }
}
