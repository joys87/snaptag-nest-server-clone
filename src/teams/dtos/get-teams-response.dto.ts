import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TeamsEntity } from 'src/prisma/entities/teams.entity';

export class GetTeamsResponseDto {
  @ApiProperty({ type: [TeamsEntity] })
  @Type(() => TeamsEntity)
  readonly teams: TeamsEntity[] | null;

  constructor(partial: Partial<GetTeamsResponseDto>) {
    Object.assign(this, partial);
  }
}
