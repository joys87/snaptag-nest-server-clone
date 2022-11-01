// import { BadRequestException, Injectable } from '@nestjs/common';

// @Injectable()
// export class UploadImageService {
//   uploadFile(file: Express.Multer.File) {
//     if (!file) {
//       throw new BadRequestException('파일이 존재하지 않습니다');
//     }

//     return { filePath: file.path };
//   }

//   public async getUploadImageUrl(
//     file: Express.Multer.File,
//     entityPath: string,
//     resizeOptions?: { width: number; height: number },
//   ): Promise<string> {
//     const { filePath } = await this.uploadFile(file);

//     return filePath;
//   }
// }
