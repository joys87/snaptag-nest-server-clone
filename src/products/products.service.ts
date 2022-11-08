import { Injectable } from '@nestjs/common';
import { IUploadImage } from 'src/upload-image/upload-image.interface';
import { CreateProductsForOfflineBodyRequestDto } from './dtos/create-products-for-offline-request.dto';
import { EmbeddingService } from './embedding.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly uploadImageService: IUploadImage, 
    private readonly embeddingService: EmbeddingService) {}

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

    const { productCode, labcodeImageUrl } = await this.embeddingService.getLabcodeImageUrlForCreate({
        projectId,
        embedding,
        channel,
        scale,
        alpha,
        amount,
        unit,
        dpi,
        sourceImageUrl
    })
    await this.;
  }
}
