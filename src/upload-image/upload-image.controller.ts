import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from './upload-image.service';

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFiles() file: Express.Multer.File) {
    console.log(file);
  }
}
