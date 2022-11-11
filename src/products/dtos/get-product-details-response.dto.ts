import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CountriesEntity } from 'src/prisma/entities/Countries.entity';
import { IndustriesEntity } from 'src/prisma/entities/industries.entity';
import { MainCategoriesEntity } from 'src/prisma/entities/mainCategories.entity';
import { ProductsEntity } from 'src/prisma/entities/products.entity';
import { ProjectsEntity } from 'src/prisma/entities/projects.entity';
import { SubCategoriesEntity } from 'src/prisma/entities/subCategories.entity';
import { TeamsEntity } from 'src/prisma/entities/teams.entity';
import { VersionsEntity } from 'src/prisma/entities/versions.entity';

class GetProductDetailsUsedProjects extends ProjectsEntity {
  @ApiProperty({ type: VersionsEntity })
  versions: VersionsEntity | null;

  @ApiProperty({ type: CountriesEntity })
  countries: CountriesEntity | null;

  @ApiProperty({ type: IndustriesEntity })
  industries: IndustriesEntity | null;

  @ApiProperty({ type: TeamsEntity })
  @Type(() => TeamsEntity)
  teams: TeamsEntity | null;

  @ApiProperty({ type: MainCategoriesEntity })
  mainCategories: MainCategoriesEntity | null;

  @ApiProperty({ type: SubCategoriesEntity })
  subCategories: SubCategoriesEntity | null;
}

export class GetProductDetails extends ProductsEntity {
  @ApiProperty({ type: GetProductDetailsUsedProjects })
  projects: GetProductDetailsUsedProjects;
}

export class GetProductDetailsResponseDto {
  @ApiProperty({ type: GetProductDetails })
  products: GetProductDetails;

  constructor(partial: Partial<GetProductDetailsResponseDto>) {
    Object.assign(this, partial);
  }
}
