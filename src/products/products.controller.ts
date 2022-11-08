import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { DataPipeline } from 'aws-sdk';
import { CreateProductsForOfflineBodyRequestDto } from './dtos/create-products-for-offline-request.dto';
import { CreateProductsForOfflineResponseDto } from './dtos/create-products-for-offline-response.dto';
import { ProductsError } from './error';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '오프라인 전용 제품 생성 API',
    description:
      'Swagger Empty Value 에 대한 문제 때문에 Postman API Test 권장',
  })
  @ApiCreatedResponse({
    type: CreateProductsForOfflineResponseDto,
  })
  @UseInterceptors(FileInterceptor('sourceImage'))
  public async createProductsForOffline(
    @UploadedFile() sourceImageFile: Express.Multer.File,
    @Body()
    { sourceImage, ...dto }: CreateProductsForOfflineBodyRequestDto,
  ) {
    if (!sourceImageFile) {
      throw new NotFoundException(ProductsError.NOT_FOUND_SOURCE_IMAGE);
    }

    const products = await this.productsService.createForOffline(
      sourceImageFile,
      dto,
    );

    return new CreateProductsForOfflineResponseDto({
      products,
    });
  }
}
