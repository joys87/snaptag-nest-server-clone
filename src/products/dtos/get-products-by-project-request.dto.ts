import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { PaginationRequestDto } from 'src/shared/dtos/pagination-request.dto';

export class GetProductsByProjectRequestDto extends PaginationRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly projectId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly productCode: number;
}
