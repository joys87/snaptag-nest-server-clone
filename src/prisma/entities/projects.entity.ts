import { ApiProperty } from '@nestjs/swagger';
import { Projects, ProjectStatus } from '@prisma/client';

export class ProjectsEntity implements Projects {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

  @ApiProperty({ nullable: true })
  versionId: number | null;

  @ApiProperty({ nullable: true })
  versionCode: number | null;

  @ApiProperty({ nullable: true })
  countryId: number | null;

  @ApiProperty({ nullable: true })
  countryCode: number | null;

  @ApiProperty({ nullable: true })
  industryId: number | null;

  @ApiProperty({ nullable: true })
  industryCode: number | null;

  @ApiProperty({ nullable: true })
  teamId: number | null;

  @ApiProperty({ nullable: true })
  teamCode: number | null;

  @ApiProperty({ nullable: true })
  mainCategoryId: number | null;

  @ApiProperty({ nullable: true })
  mainCategoryCode: number | null;

  @ApiProperty({ nullable: true })
  subCategoryId: number | null;

  @ApiProperty({ nullable: true })
  subCategoryCode: number | null;

  @ApiProperty({ nullable: true })
  bmId: number | null;

  @ApiProperty({ nullable: true })
  bmCode: number | null;

  @ApiProperty()
  code: number;

  @ApiProperty({ nullable: true })
  title: string | null;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ nullable: true })
  bannerImage: string | null;

  @ApiProperty({ nullable: true })
  homepage: string | null;

  @ApiProperty({ enum: [ProjectStatus] })
  status: ProjectStatus;

  static update(
    title: string,
    bannerImage: string,
    description?: string,
    homepage?: string,
  ) {
    const projects = new ProjectsEntity();
    projects.title = title;
    projects.description = description || null;
    projects.bannerImage = bannerImage;
    projects.homepage = homepage || null;

    return projects;
  }
}
