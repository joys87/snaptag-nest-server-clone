import { ApiProperty } from '@nestjs/swagger';
import { ProductsEntity } from 'src/prisma/entities/products.entity';

export class GetProductsByProjectResponseDto {
  @ApiProperty({ type: ProductsEntity, isArray: true, nullable: true })
  products: ProductsEntity[] | null;

  @ApiProperty()
  total: number;

  constructor(partial: Partial<GetProductsByProjectResponseDto>) {
    Object.assign(this, partial);
  }
}
