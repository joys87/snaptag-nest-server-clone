import { ApiProperty } from '@nestjs/swagger';
import { SubCategories } from '@prisma/client';

export class SubCategoriesEntity implements SubCategories {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

  @ApiProperty()
  mainCategoryId: number;

  @ApiProperty()
  code: number;

  @ApiProperty({ nullable: true })
  title: string | null;

  @ApiProperty({ nullable: true })
  order: number | null;

  @ApiProperty()
  countProject: number;
}
