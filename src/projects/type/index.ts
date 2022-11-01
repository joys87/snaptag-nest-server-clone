import { Prisma } from '@prisma/client';

export interface IFindProjectsByCodes {
  versionCode: number;
  projectCode: number;
  industryId?: number;
  countryCode?: number;
  teamCode?: number;
  mainCategoryCode?: number;
  subCategoryCode?: number;
}

export type TProjectWithIndustry = Prisma.ProjectsGetPayload<{
  include: {
    industries: true;
  };
}>;

export type TProjectWithBms = Prisma.ProjectsGetPayload<{
  include: {
    bms: true;
  };
}>;

export type TGetProjects = [TProjectWithIndustry[], number];

export interface IGetMaxTeamCodeByIdsOptions {
  versionId: number;
  countryId: number;
  industryId: number;
  mainCategoryId?: number;
  subCategoryId?: number;
}

export interface IGetMaxCodeByIdsOptions {
  versionId: number;
  countryId: number;
  industryId: number;
  teamId: number;
  mainCategoryId?: number;
  subCategoryId?: number;
}

export interface ICalculateTeamCodeOptions {
  versionId: number;
  countryId: number;
  industryId: number;
  teamId: number;
  mainCategoryId?: number;
  subCategoryId?: number;
}

export interface IGetCodeForCreateOptions {
  versionId: number;
  countryId: number;
  industryId: number;
  teamId: number;
  mainCategoryId?: number;
  subCategoryId?: number;
  bmId?: number;
}

export interface IGetCodeForCreate {
  code: number;
  versionCode: number;
  countryCode: number;
  industryCode: number;
  teamCode: number;
  mainCategoryCode: number | null;
  subCategoryCode: number | null;
  bmCode: number | null;
}

export interface IFindByBmCodeForScan {
  bmCode: number;
  versionCode: number;
  countryCode: number;
  industryId: number;
}
