import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IResizeOptions } from 'src/shared/type';
import { UploadImageError } from './error';
import { IUploadS3, TUploadImage } from './type';
import { IUploadImage } from './upload-image.interface';
import { S3 } from 'aws-sdk';
import * as sharp from 'sharp';
import { RandomId } from '@app/utils/random-id';
import { AwsS3ConfigProvider } from '@app/config/aws/aws-s3-config-provider';

@Injectable()
export class UploadImageService implements IUploadImage {
  constructor(private readonly s3Provider: AwsS3ConfigProvider) {}

  private getDatePath() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  }

  private setImageResize({
    buffer,
    width,
    height,
  }: {
    buffer: Buffer;
    width: number;
    height: number;
  }): Promise<Buffer> {
    return sharp(buffer)
      .resize(width, height, { fit: sharp.fit.outside })
      .toBuffer();
  }

  private uploadImageToS3(s3: S3, s3Params: S3.Types.PutObjectRequest) {
    return new Promise((resolve, reject) => {
      s3.upload(s3Params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err);
        }
        resolve(data);
      });
    });
  }

  private async uploadS3({
    file,
    bucket,
    name,
    mimetype,
    resizeOptions,
  }: IUploadS3) {
    const s3 = this.s3Provider.getS3();
    const s3Params: S3.Types.PutObjectRequest = {
      Bucket: bucket,
      Key: name,
      Body: resizeOptions
        ? await this.setImageResize({
            buffer: file,
            width: resizeOptions.width,
            height: resizeOptions.height,
          })
        : file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      ACL: 'public-read',
    };

    return this.uploadImageToS3(s3, s3Params);
  }

  private uploadImage(
    file: Express.Multer.File,
    entityPath: string,
    resizeOptions?: IResizeOptions,
  ): Promise<TUploadImage> {
    const { originalname, buffer, mimetype } = file;
    const s3Bucket = this.s3Provider.getBucketName();

    try {
      return this.uploadS3({
        file: buffer,
        bucket: s3Bucket,
        name: `media/${entityPath}/sourceImage/${this.getDatePath()}/${RandomId.generateRandomId()}/${originalname}`,
        mimetype,
        resizeOptions,
      }) as Promise<TUploadImage>;
    } catch (error) {
      throw new InternalServerErrorException(
        UploadImageError.FAIL_IMAGE_UPLOAD,
      );
    }
  }

  public async getUploadImageUrl(
    file: Express.Multer.File,
    entityPath: string,
    resizeOptions?: IResizeOptions,
  ): Promise<string> {
    const { Location } = await this.uploadImage(
      file,
      entityPath,
      resizeOptions,
    );

    return Location;
  }
}
