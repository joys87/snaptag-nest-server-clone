import { ApiProperty } from '@nestjs/swagger';
import { VersionsEntity } from 'src/prisma/entities/versions.entity';

export class GetVersionsResponseDto {
  @ApiProperty({ type: [VersionsEntity] })
  versions: VersionsEntity[] | null;

  constructor(partial: Partial<GetVersionsResponseDto>) {
    Object.assign(this, partial);
  }
}
