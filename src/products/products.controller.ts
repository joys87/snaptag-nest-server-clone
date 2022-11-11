import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { query } from 'express';
import { CreateProductsForOfflineBodyRequestDto } from './dtos/create-products-for-offline-request.dto';
import { CreateProductsForOfflineResponseDto } from './dtos/create-products-for-offline-response.dto';
import { GetProductsByProjectRequestDto } from './dtos/get-products-by-project-request.dto';
import { GetProductsByProjectResponseDto } from './dtos/get-products-by-project-response.dto';
import { ProductsError } from './error';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('[Embedding] Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('offline')
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

  @Get('/')
  @ApiOperation({ summary: '프로젝트 별 제품 조회 API' })
  @ApiOkResponse({ type: GetProductsByProjectResponseDto })
  public async getProductsByProjects(
    @Query() getProductsByProjectRequestDto: GetProductsByProjectRequestDto,
  ) {
    const result = await this.productsService.getProductsByProject(
      getProductsByProjectRequestDto,
    );
    console.log(result);
    return new GetProductsByProjectResponseDto(result);
  }

  // @Get('/:productId/details')
  // @ApiOperation({ summary: '제품 상세 조회 API' })
  // @ApiOkResponse({ type: GetProductDetailResponseDto })
  // public async getProductsDetail() {}
}
