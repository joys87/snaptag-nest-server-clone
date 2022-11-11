import { Channel, Embedding } from '@prisma/client';

export interface ISetEmbeddingParams {
  versionCode: number | null;
  countryCode: number | null;
  industryCode: number | null;
  customerCode: number | null;
  mainCategory: number | null;
  subCategory: number | null;
  productCode: number | null;
  productSeq: number;
  sourceImg: string;
  embeddingVersion: Embedding;
  channel: Channel;
  scale: number;
  alpha: number;
  isVariable: boolean;
  isAdmin: boolean;
  isDigital: boolean;
  isNFT: boolean;
  bm: number;
  format: 'jpg';
  amount: number;
  unit: number;
  dpi: number;
  payloadVersion: number;
}
