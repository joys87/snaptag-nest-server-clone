import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import path from 'path';
import { AppModule } from './app.module';
import { PrismaService } from './prisma';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
  //   prefix: '/media',
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
      forbidNonWhitelisted: true, // 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
      transform: true, // 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('LAB Code Core API Document')
    .setDescription(
      `
    LAB Code Core API 문서입니다.
      `,
    )
    .setVersion('1.0')
    // .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  //refer: nestJS official recipees/prisma
}
bootstrap();
