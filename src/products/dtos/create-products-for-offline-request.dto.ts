import { ApiProperty } from '@nestjs/swagger';
import { Channel, Embedding, Products, ProductStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductsForOfflineBodyRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly url?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly urlPurchase?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly urlCustom?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly urlInstagram?: string;

  @ApiProperty({ default: 4 })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly scale: number;

  @ApiProperty({ default: 8 })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly alpha: number;

  @ApiProperty({ enum: Embedding, default: Embedding.v25 })
  @IsNotEmpty()
  @IsEnum(Embedding)
  readonly embedding: Embedding;

  @ApiProperty({ enum: Channel })
  @IsNotEmpty()
  @IsEnum(Channel)
  readonly channel: Channel;

  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly amount: number;

  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly unit: number;

  @ApiProperty({ default: 300 })
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly dpi: number;

  @ApiProperty({ type: 'file' })
  readonly sourceImage: Express.Multer.File;
}
