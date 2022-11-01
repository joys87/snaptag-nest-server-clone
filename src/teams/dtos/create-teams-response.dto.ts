import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TeamsEntity } from 'src/prisma/entities/teams.entity';

export class CreateTeamsResponseDto {
  @ApiProperty({ type: TeamsEntity })
  @Type(() => TeamsEntity)
  teams: TeamsEntity;

  constructor(partial: Partial<CreateTeamsResponseDto>) {
    Object.assign(this, partial);
  }
}
