import { ApiProperty } from '@nestjs/swagger';
import { Industries, Status } from '@prisma/client';

export class IndustriesEntity implements Industries {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

  @ApiProperty()
  versionId: number;

  @ApiProperty()
  versionCode: number;

  @ApiProperty()
  code: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  maxTeamCode: bigint | null;

  @ApiProperty({ nullable: true })
  maxMainCategoryCode: bigint | null;

  @ApiProperty({ nullable: true })
  maxSubCategoryCode: bigint | null;

  @ApiProperty({ nullable: true })
  maxProjectCode: bigint | null;

  @ApiProperty({ nullable: true })
  maxProductCode: bigint | null;

  @ApiProperty({ enum: [Status] })
  status: Status;

  @ApiProperty()
  isVariable: boolean;

  @ApiProperty()
  isMaxCode: boolean;

  @ApiProperty()
  isDigital: boolean;

  @ApiProperty()
  isNFT: boolean;

  @ApiProperty()
  isAdminOnly: boolean;
}
