import { ApiProperty } from '@nestjs/swagger';
import { IndustriesEntity } from 'src/prisma/entities/industries.entity';
import { ProjectsEntity } from 'src/prisma/entities/projects.entity';

class GetProjects extends ProjectsEntity {
  @ApiProperty({ type: IndustriesEntity, nullable: true })
  industries: IndustriesEntity | null;
}

export class GetProjectsResponseDto {
  @ApiProperty({ type: GetProjects, isArray: true, nullable: true })
  projects: GetProjects[] | null;

  @ApiProperty()
  total: number;

  constructor(partial: Partial<GetProjectsResponseDto>) {
    Object.assign(this, partial);
  }
}
