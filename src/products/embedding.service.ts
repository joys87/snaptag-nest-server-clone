import { Injectable, Module } from '@nestjs/common';
import { IGetEmbeddingParamOptions, IGetLabcodeImageUrl } from './type';

@Injectable()
export class EmbeddingService {
  constructor() {}

  public async getLabcodeImageUrlForCreate({
    projectId,
    embedding,
    channel,
    scale,
    alpha,
    amount,
    unit,
    dpi,
    sourceImageUrl,
    userId,
  }: IGetEmbeddingParamOptions): Promise<IGetLabcodeImageUrl> {
    const embeddingParam = await this.getEmbeddingParamForCreate({
      projectId,
      embedding,
      channel,
      scale,
      alpha,
      amount,
      unit,
      dpi,
      sourceImageUrl,
      userId,
    });

    const labcodeImageUrl = await this.workerServerService.getEmbeddingImageUrl(
      embeddingParam,
    );

    return {
      productCode: embeddingParam.productSeq,
      labcodeImageUrl,
    };
  }
}

@Module({
  providers: [connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      ecports: providers,
    };
  }
}
