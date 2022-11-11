import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios, { AxiosRequestConfig } from 'axios';
import { WorkerServerError } from './error';
import { ISetEmbeddingParams } from './type';
import { IWorkerServer } from './worker-server.interface';

@Injectable()
export class WorkerServerService implements IWorkerServer {
  constructor(private readonly configService: ConfigService) {}

  public async getEmbeddingImageUrl(
    param: ISetEmbeddingParams,
  ): Promise<string> {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `${this.configService.get<string>('LABCODE_WORKDER_URL')}/worker`,
        headers: {
          'Content-Type': 'application/json',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: JSON.stringify(param),
      };
      const { data: response } = await axios(config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        WorkerServerError.FAIL_GET_EMBEDDING_IMAGE_URL,
      );
    }
  }

  public async getEmbeddingImageUrls(
    param: ISetEmbeddingParams,
  ): Promise<string[]> {
    if (param.isVariable === false) {
      throw new ForbiddenException();
    }

    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `${this.configService.get<string>(
          'LABCODE_WORKDER_URL',
        )}/worker/mass`,
        headers: {
          'content-type': 'application/json',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: JSON.stringify(param),
      };
      const { data: response } = await axios(config);

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        WorkerServerError.FAIL_GET_EMBEDDING_IMAGE_URL,
        error,
      );
    }
  }
  public async getDetectImage(
    labcodeImageUrl: string,
  ): Promise<string[] | 'DATA_NONE'> {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `${this.configService.get<string>('LABCODE_WORKDER_URL')}/detect`,
        headers: {
          'Content-Type': 'application/json',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: {
          labcodeImg: labcodeImageUrl,
        },
      };
      const { data } = await axios(config);
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        WorkerServerError.FAIL_DETECT_IMAGE,
      );
    }
  }
}
