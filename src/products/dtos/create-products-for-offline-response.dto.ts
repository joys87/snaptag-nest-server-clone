import { ApiProperty } from '@nestjs/swagger';
import { ProductsEntity } from 'src/prisma/entities/productsEntity';

export class CreateProductsForOfflineResponseDto {
  @ApiProperty({ type: ProductsEntity })
  readonly products: ProductsEntity;

  constructor(partial: Partial<CreateProductsForOfflineResponseDto>) {
    Object.assign(this, partial);
    console.log(this);
  }
}
