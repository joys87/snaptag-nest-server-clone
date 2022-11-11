import { ISetEmbeddingParams } from './type';

export abstract class IWorkerServer {
  abstract getEmbeddingImageUrl(param: ISetEmbeddingParams): Promise<string>;
  abstract getEmbeddingImageUrls(param: ISetEmbeddingParams): Promise<string[]>;
  abstract getDetectImage(
    labcodeImageUrl: string,
  ): Promise<string[] | 'DATA_NONE'>;
}
