import { ApiProperty } from '@nestjs/swagger';
import { MainCategories } from '@prisma/client';

export class MainCategoriesEntity implements MainCategories {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

  @ApiProperty()
  industryId: number;

  @ApiProperty()
  code: number;

  @ApiProperty({ nullable: true })
  title: string | null;

  @ApiProperty({ nullable: true })
  order: number | null;

  @ApiProperty({ nullable: true })
  countProject: number | null;
}
