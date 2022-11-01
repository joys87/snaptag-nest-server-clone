import { ApiProperty } from '@nestjs/swagger';
import { Teams, TeamStatus } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class TeamsEntity implements Teams {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

  @ApiProperty({ nullable: false })
  title: string | null;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ nullable: true })
  call: string | null;

  @ApiProperty({ nullable: true })
  logoImage: string | null;

  @ApiProperty({ nullable: true })
  businessNumber: string | null;

  @ApiProperty({ nullable: true })
  businessImage: string | null;

  @ApiProperty({ nullable: true })
  homepage: string | null;

  @ApiProperty({ nullable: true })
  managerName: string | null;

  @ApiProperty({ nullable: true })
  managerEmail: string | null;

  @ApiProperty({ nullable: true })
  managerPhone: string | null;

  @ApiProperty({ nullable: true })
  address: string | null;

  @ApiProperty({ enum: [TeamStatus] })
  status: TeamStatus;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  apiKey: string;

  @ApiProperty()
  apiSecret: string;

  @ApiProperty({ nullable: true })
  @Exclude()
  refreshToken: string | null;
}
