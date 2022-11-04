import { IResizeOptions } from 'src/shared/type';

export interface IUploadS3 {
  file: Buffer;
  bucket: string;
  name: string;
  mimetype: string;
  resizeOptions?: IResizeOptions;
}

export type TUploadImage = {
  ETag: string;
  Location: string;
  key: string;
  Key: string;
  Bucket: string;
};
