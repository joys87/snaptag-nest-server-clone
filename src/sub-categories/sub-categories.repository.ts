import { Injectable } from '@nestjs/common';
import { SubCategories } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class SubCategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getById(id: number): Promise<SubCategories | null> {
    return this.prismaService.subCategories.findUnique({
      where: {
        id,
      },
    });
  }
}
