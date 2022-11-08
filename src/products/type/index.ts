import { Bms, Channel, Embedding, Prisma, Products } from '@prisma/client';

import { GetProductsByUserForProgramRequestDto } from '../dto/program';

export interface IFindRelatedProductByProjectIdOptions {
  projectId: number;
  productCode: number;
  userId?: number;
  userCode?: number;
}

export type TGetRelatedProduct = Prisma.ProductsGetPayload<{
  include: {
    projects: {
      include: {
        versions: true;
        countries: true;
        industries: true;
        teams: true;
        mainCategories: true;
        subCategories: true;
      };
    };
  };
}>;

export interface IValidateProductScansOption {
  isSdk: boolean;
  teamId?: number;
}

export type TFindByConditions = [
  Prisma.ProductsGetPayload<{ include: { projects: true } }>[],
  number,
];

export type TFindProductsForPagination = [Products[], number];

export interface IGetEmbeddingParamOptions {
  projectId: number;
  embedding: Embedding;
  channel: Channel;
  scale: number;
  alpha: number;
  amount: number;
  unit: number;
  dpi: number;
  sourceImageUrl: string;
  userId?: number;
}

export interface IGetEmbeddingParamForUpdateOptions {
  projectId: number;
  embedding: Embedding;
  channel: Channel;
  scale: number;
  alpha: number;
  amount: number;
  unit: number;
  dpi: number;
  sourceImageUrl: string;
  productSeq: number;
  userCode?: number;
}

export interface IGetLabcodeImageUrl {
  productCode: number;
  labcodeImageUrl: string;
}

export interface IGetProductsByUserOptions {
  isAdmin: boolean;
  userId: number;
  dto: GetProductsByUserForProgramRequestDto;
}

export interface IFindByUserIdsOptions {
  page: number;
  pageSize: number;
  userIds: number[];
}

export interface IFindProductsForDetectOptions {
  versionCode;
  countryCode;
  industryCode;
  bmCode;
  userCode;
  productCode;
}

export interface ISetScaleAlphaOptions {
  scaleMin: number;
  scaleMax: number;
  scaleSkip: number;
  alphaMin: number;
  alphaMax: number;
  alphaSkip: number;
}

export interface ISetScaleAlpha {
  scale: number;
  alpha: number;
}

export interface ISetBulkDataOptions {
  projectId: number;
  embedding: Embedding;
  channel: Channel;
  amount: number;
  unit: number;
  dpi: number;
  title: string;
  sourceImageUrl: string;
  description?: string;
  url?: string;
}

export interface IParseEmbeddingParamOptions {
  versionCode: number;
  countryCode: number;
  customerCode: number;
  industryCode: number;
  mainCategoryCode?: number;
  subCategoryCode?: number;
  projectCode: number;
  bmCode?: number;
  productSeq: number;
  sourceImageUrl: string;
  embedding: Embedding;
  channel: Channel;
  scale: number;
  alpha: number;
  isVariable: boolean;
  isAdmin: boolean;
  isDigital: boolean;
  isNFT: boolean;
  amount: number;
  unit: number;
  dpi: number;
}

export interface IIsMassOptions {
  versionCode: number;
  countryCode: number;
  industryCode: number;
  customerCode: number;
  projectCode: number;
  isVariable: boolean;
}

export interface IFindByStartAndEndSeqOptions {
  projectId: number;
  startSeq: number;
  endSeq: number;
}

export interface IGetEmbeddingDataAndProductSeq {
  versionCode: number;
  countryCode: number;
  teamCode: number | null;
  industryCode: number;
  mainCategoryCode: number | null;
  subCategoryCode: number | null;
  projectCode: number;
  bmCode: number | null;
  isVariable: boolean;
  isDigital: boolean;
  isNFT: boolean;
  isAdminOnly: boolean;
  maxProductCode: bigint;
  bmId: number | null;
  bms: Bms | null;
}
