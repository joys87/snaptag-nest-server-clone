import { ApiProperty } from '@nestjs/swagger';
import { ProjectsEntity } from 'src/prisma/entities/projects.entity';

export class CreateProjectsResponseDto {
  @ApiProperty({ type: ProjectsEntity })
  readonly projects: ProjectsEntity;

  constructor(partial: Partial<CreateProjectsResponseDto>) {
    Object.assign(this, partial);
  }
}
