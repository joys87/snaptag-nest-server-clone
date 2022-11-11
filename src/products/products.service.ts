import { Injectable } from '@nestjs/common';
import { IUploadImage } from 'src/upload-image/upload-image.interface';
import { CreateProductsForOfflineBodyRequestDto } from './dtos/create-products-for-offline-request.dto';
import { GetProductsByProjectRequestDto } from './dtos/get-products-by-project-request.dto';
import { GetProductsByProjectResponseDto } from './dtos/get-products-by-project-response.dto';
import { EmbeddingService } from './embedding.service';
import { ProductsRepository } from './repository/products.repository';
import * as _ from 'lodash';

@Injectable()
export class ProductsService {
  constructor(
    private readonly uploadImageService: IUploadImage,
    private readonly embeddingService: EmbeddingService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  public async createForOffline(
    file: Express.Multer.File,
    dto: Omit<CreateProductsForOfflineBodyRequestDto, 'sourceImage'>,
  ) {
    const sourceImageUrl = await this.uploadImageService.getUploadImageUrl(
      file,
      'products',
    );

    const { projectId, embedding, channel, scale, alpha, amount, unit, dpi } =
      dto;

    const { productCode, labcodeImageUrl } =
      await this.embeddingService.getLabcodeImageUrlForCreate({
        projectId,
        embedding,
        channel,
        scale,
        alpha,
        amount,
        unit,
        dpi,
        sourceImageUrl,
      });
    return this.productsRepository.create({
      ...dto,
      code: productCode,
      sourceImage: sourceImageUrl,
      labcodeImage: labcodeImageUrl,
    });
  }

  public async getProductsByProject(
    options: GetProductsByProjectRequestDto,
  ): Promise<GetProductsByProjectResponseDto> {
    const [products, total] = await this.productsRepository.findByProject(
      options,
    );
    return {
      products: _.isEmpty(products) ? null : products,
      total,
    };
  }
}
