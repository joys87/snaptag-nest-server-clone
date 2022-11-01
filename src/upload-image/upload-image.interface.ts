import { IResizeOptions } from 'src/shared/type';

export abstract class IUploadImage {
  abstract getUploadImageUrl(
    file: Express.Multer.File,
    entityPath: string,
    resizeOptions?: IResizeOptions,
  ): Promise<string>;
}
