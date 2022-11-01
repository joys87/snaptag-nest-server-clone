import { Injectable } from '@nestjs/common';
import { Countries } from '@prisma/client';
import { PrismaService } from 'src/prisma';
@Injectable()
export class CountriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getById(id: number): Promise<Countries | null> {
    return this.prismaService.countries.findUnique({
      where: {
        id,
      },
    });
  }
}
