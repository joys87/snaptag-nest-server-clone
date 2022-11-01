import { Injectable } from '@nestjs/common';
import { Bms } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class BmsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getById(id: number): Promise<Bms | null> {
    return this.prismaService.bms.findUnique({
      where: {
        id,
      },
    });
  }
}
