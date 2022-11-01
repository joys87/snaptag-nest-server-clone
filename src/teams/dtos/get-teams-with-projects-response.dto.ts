import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProjectsEntity } from 'src/prisma/entities/projects.entity';
import { TeamsEntity } from 'src/prisma/entities/teams.entity';

class GetTeamsWithProjects extends TeamsEntity {
  @ApiProperty({ type: [ProjectsEntity] })
  projects: ProjectsEntity[];
}

export class GetTeamsWithProjectsQueryResponseDto {
  @ApiProperty({ type: GetTeamsWithProjects, isArray: true, nullable: true })
  @Type(() => GetTeamsWithProjects)
  teams: GetTeamsWithProjects[] | null;

  constructor(partial: Partial<GetTeamsWithProjectsQueryResponseDto>) {
    Object.assign(this, partial);
  }
}
