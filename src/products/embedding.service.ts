import { WorkerServerService } from '@app/worker-server';
import { ISetEmbeddingParams } from '@app/worker-server/type';
import { IWorkerServer } from '@app/worker-server/worker-server.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IndustriesService } from 'src/industries/industries.service';
import { ProjectsService } from 'src/projects/service';
import { isNumberExistIncludingZero } from 'src/shared/validate';
import { CalculateCodesService } from './calculate-codes.service';
import { ProductsError } from './error';
import {
  IGetEmbeddingDataAndProductSeq,
  IGetEmbeddingParamOptions,
  IGetLabcodeImageUrl,
  IParseEmbeddingParamOptions,
} from './type';

@Injectable()
export class EmbeddingService {
  constructor(
    private readonly workerServerService: IWorkerServer,
    private readonly projectsService: ProjectsService,
    private readonly industriesService: IndustriesService,
    private readonly calculateCodeService: CalculateCodesService,
  ) {}

  public async getEmbeddingDataByProjectId(
    projectId: number,
  ): Promise<IGetEmbeddingDataAndProductSeq> {
    const {
      industryId,
      versionCode,
      countryCode,
      teamCode,
      industryCode,
      mainCategoryCode,
      subCategoryCode,
      code: projectCode,
      bmCode,
      bmId,
      bms,
    } = await this.projectsService.findActiveById(projectId);

    const { isVariable, isDigital, isNFT, isAdminOnly, maxProductCode } =
      await this.industriesService.findById(industryId);

    return {
      versionCode,
      countryCode,
      teamCode,
      industryCode,
      mainCategoryCode,
      subCategoryCode,
      projectCode,
      bmCode,
      isVariable,
      isDigital,
      isNFT,
      isAdminOnly,
      maxProductCode,
      bmId,
      bms,
    };
  }

  public parseEmbeddingParam({
    versionCode,
    countryCode,
    customerCode,
    industryCode,
    mainCategoryCode,
    subCategoryCode,
    projectCode,
    bmCode,
    productSeq,
    sourceImageUrl,
    embedding,
    channel,
    scale,
    alpha,
    isVariable,
    isAdmin,
    isDigital,
    isNFT,
    amount,
    unit,
    dpi,
  }: IParseEmbeddingParamOptions): ISetEmbeddingParams {
    return {
      versionCode: isNumberExistIncludingZero(versionCode) ? versionCode : null,
      countryCode: isNumberExistIncludingZero(countryCode) ? countryCode : null,
      customerCode: isNumberExistIncludingZero(customerCode)
        ? customerCode
        : null,
      industryCode: isNumberExistIncludingZero(industryCode)
        ? industryCode
        : null,
      mainCategory: isNumberExistIncludingZero(mainCategoryCode)
        ? mainCategoryCode
        : null,
      subCategory: isNumberExistIncludingZero(subCategoryCode)
        ? subCategoryCode
        : null,
      productCode: projectCode,
      productSeq,
      sourceImg: sourceImageUrl,
      embeddingVersion: embedding,
      channel,
      scale,
      alpha,
      isVariable,
      isAdmin,
      isDigital,
      isNFT,
      bm: bmCode,
      format: 'jpg',
      amount,
      unit,
      dpi,
      payloadVersion: 1,
    };
  }

  private async getEmbeddingParamForCreate({
    projectId,
    embedding,
    channel,
    scale,
    dpi,
    unit,
    amount,
    alpha,
    sourceImageUrl,
    userId,
  }: IGetEmbeddingParamOptions): Promise<ISetEmbeddingParams> {
    const {
      versionCode,
      countryCode,
      teamCode,
      industryCode,
      mainCategoryCode,
      subCategoryCode,
      projectCode,
      bmCode,
      isVariable,
      isAdminOnly: isAdmin,
      isDigital,
      isNFT,
      maxProductCode,
      bms,
    } = await this.getEmbeddingDataByProjectId(projectId);

    // 프로그램용일 경우
    if (userId && (!bms || !isNumberExistIncludingZero(bmCode))) {
      throw new BadRequestException(ProductsError.NOT_FOUND_PROJECT_BMS);
    }

    // 프로그램용일 경우 customerCode 는 userCode 이고, 아닐 경우 teamCode 가 customerCode 이다
    const customerCode = userId
      ? await this.calculateCodeService.extractUserCode({
          userId,
          projectId,
          maxUserCode: bms.maxUserCode,
        })
      : teamCode;

    const productSeq = await this.calculateCodeService.extractProductCode({
      projectId,
      ...(userId && { userCode: customerCode }),
      maxProductCode,
    });

    return this.parseEmbeddingParam({
      versionCode,
      countryCode,
      customerCode,
      industryCode,
      mainCategoryCode,
      subCategoryCode,
      projectCode,
      bmCode,
      productSeq,
      sourceImageUrl,
      embedding,
      channel,
      scale,
      alpha,
      isVariable,
      isAdmin,
      isDigital,
      isNFT,
      amount,
      unit,
      dpi,
    });
  }

  public async getLabcodeImageUrlForCreate({
    projectId,
    embedding,
    channel,
    scale,
    alpha,
    amount,
    unit,
    dpi,
    sourceImageUrl,
    userId,
  }: IGetEmbeddingParamOptions): Promise<IGetLabcodeImageUrl> {
    const embeddingParam = await this.getEmbeddingParamForCreate({
      projectId,
      embedding,
      channel,
      scale,
      alpha,
      amount,
      unit,
      dpi,
      sourceImageUrl,
      userId,
    });

    const labcodeImageUrl = await this.workerServerService.getEmbeddingImageUrl(
      embeddingParam,
    );

    return {
      productCode: embeddingParam.productSeq,
      labcodeImageUrl,
    };
  }
}
