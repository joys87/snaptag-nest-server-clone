import { Injectable } from '@nestjs/common';
import { Industries } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class IndustriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getById(id: number): Promise<Industries> {
    return this.prismaService.industries.findUnique({
      where: {
        id,
      },
    });
  }
}
