import { ApiProperty } from '@nestjs/swagger';
import { Status, Versions } from '@prisma/client';

export class VersionsEntity implements Versions {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

  @ApiProperty()
  code: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: [Status] })
  status: Status;
}
