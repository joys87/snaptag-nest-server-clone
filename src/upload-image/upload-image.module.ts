import { AwsModule } from '@app/config/aws/aws.module';
import { Global, Module } from '@nestjs/common';

import { IUploadImage } from './upload-image.interface';
import { UploadImageService } from './upload-image.service';

@Global()
@Module({
  imports: [AwsModule],
  providers: [
    {
      provide: IUploadImage,
      useClass: UploadImageService,
    },
  ],
  exports: [IUploadImage],
})
export class UploadImageModule {}
