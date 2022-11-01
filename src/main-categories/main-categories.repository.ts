import { Injectable } from '@nestjs/common';
import { MainCategories } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class MainCategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getById(id: number): Promise<MainCategories | null> {
    return this.prismaService.mainCategories.findUnique({
      where: {
        id,
      },
    });
  }
}
