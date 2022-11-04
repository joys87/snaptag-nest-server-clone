import { ApiProperty } from '@nestjs/swagger';
import { IndustriesEntity } from 'src/prisma/entities/industries.entity';

export class GetIndustriesResponseDto {
  @ApiProperty({ type: [IndustriesEntity] })
  industries: IndustriesEntity[] | null;

  constructor(partial: Partial<GetIndustriesResponseDto>) {
    Object.assign(this, partial);
  }
}
