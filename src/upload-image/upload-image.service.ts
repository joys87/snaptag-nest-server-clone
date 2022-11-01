import { BadRequestException, Injectable } from '@nestjs/common';
import { IUploadImage } from './upload-image.interface';

@Injectable()
export class UploadImageService implements IUploadImage {
  uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다');
    }

    return { filePath: file.path };
  }

  public async getUploadImageUrl(file: Express.Multer.File): Promise<string> {
    const { filePath } = await this.uploadFile(file);

    return filePath;
  }
}
