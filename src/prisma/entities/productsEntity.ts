import { ApiProperty } from '@nestjs/swagger';
import { Channel, Embedding, Products, ProductStatus } from '@prisma/client';

export class ProductsEntity implements Products {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  modified: Date;

  @ApiProperty({ nullable: true })
  projectId: number | null;

  @ApiProperty({ nullable: true })
  userId: number | null;

  @ApiProperty({ nullable: true })
  userCode: number | null;

  @ApiProperty()
  code: number;

  @ApiProperty({ nullable: true })
  title: string | null;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ nullable: true })
  sourceImage: string | null;

  @ApiProperty({ nullable: true })
  resizedSourceImage: string | null;

  @ApiProperty({ nullable: true })
  labcodeImage: string | null;

  @ApiProperty({ nullable: true })
  url: string | null;

  @ApiProperty({ nullable: true })
  urlPurchase: string | null;

  @ApiProperty({ nullable: true })
  urlCustom: string | null;

  @ApiProperty({ nullable: true })
  urlInstagram: string | null;

  @ApiProperty({ enum: [Object.values(Embedding)] })
  embedding: Embedding;

  @ApiProperty({ enum: [Object.values(Channel)] })
  channel: Channel;

  @ApiProperty()
  scale: number;

  @ApiProperty()
  alpha: number;

  @ApiProperty()
  isMass: boolean;

  @ApiProperty()
  unit: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  dpi: number;

  @ApiProperty({ enum: [ProductStatus] })
  status: ProductStatus;
}
