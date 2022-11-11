import { dbNow } from '@app/utils/date';
import { Injectable } from '@nestjs/common';
import { Prisma, Products } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { GetProductsByProjectRequestDto } from '../dtos/get-products-by-project-request.dto';
import { TFindProductsForPagination } from '../type';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(
    data: Omit<Prisma.ProductsUncheckedCreateInput, 'created' | 'modified'>,
  ): Promise<Products> {
    return this.prismaService.products.create({
      data: {
        created: dbNow(),
        modified: dbNow(),
        ...data,
      },
    });
  }

  public async getMaxCodeByProjectId(projectId: number) {
    return this.prismaService.products.aggregate({
      _max: {
        code: true,
      },
      where: {
        projectId,
      },
    });
  }

  public async getMaxCodeByProjectIdForProgram(
    projectId: number,
    userCode: number,
  ) {
    return this.prismaService.products.aggregate({
      _max: {
        code: true,
      },
      where: {
        projectId,
        userCode,
      },
    });
  }

  public getByUserIdAndProjectId(userId: number, projectId: number) {
    return this.prismaService.products.findFirst({
      where: {
        userId,
        projectId,
      },
    });
  }

  public getUserMaxCode(projectId: number) {
    return this.prismaService.products.aggregate({
      _max: {
        userCode: true,
      },
      where: {
        projectId,
      },
    });
  }

  public findByProject({
    page,
    pageSize,
    projectId,
    title,
    productCode,
  }: GetProductsByProjectRequestDto): Promise<TFindProductsForPagination> {
    const where: Prisma.ProductsWhereInput = {
      projectId,
      title: {
        contains: title,
      },
      code: productCode,
    };

    return this.prismaService.$transaction([
      this.prismaService.products.findMany({
        skip: pageSize * (page - 1),
        take: pageSize,
        where,
        orderBy: {
          code: 'desc',
        },
      }),
      this.prismaService.products.count({
        where,
      }),
    ]);
  }
}
