import { JsonService } from '@app/utils/json';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, ProjectStatus } from '@prisma/client';

import _ from 'lodash';
import { BmsService } from 'src/bms/bms.service';
import { CountriesService } from 'src/countries/countries.service';
import { IndustriesService } from 'src/industries/industries.service';
import { MainCategoriesService } from 'src/main-categories/main-categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { GetTeamsWithProjectsQueryRequestDto } from 'src/teams/dtos/get-teams-with-projects-request.dto';
import { IUploadImage } from 'src/upload-image/upload-image.interface';
import { VersionsService } from 'src/versions/versions.service';
import { CreateProjectsBodyRequestDto } from '../dtos/snaptag/create-projects-request.dto';
import { GetProjectsQueryRequestDto } from '../dtos/snaptag/get-projects-request.dto';
import { GetProjectsResponseDto } from '../dtos/snaptag/get-projects-response.dto';
import { ProjectsError } from '../error';
import { ProjectsRepository } from '../projects.repository';
import { IGetCodeForCreate, IGetCodeForCreateOptions } from '../type';
import { CalculateCodesService } from './calculate-codes.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly versionsService: VersionsService,
    private readonly countriesService: CountriesService,
    private readonly industriesService: IndustriesService,
    private readonly projectsCalculatecodeService: CalculateCodesService,
    private readonly mainCategoriesService: MainCategoriesService,
    private readonly subCategoriesService: SubCategoriesService,
    private readonly bmsService: BmsService,
    private readonly uploadImageService: IUploadImage,
  ) {}

  private async getBannerImageUrl(
    image?: Express.Multer.File,
  ): Promise<string | null> {
    if (!image) {
      return null;
    }

    return this.uploadImageService.getUploadImageUrl(image, 'banner');
  }

  private async getCodesForCreate({
    // id를 받아서 코드생성 (코드는 notion의 data structure 살펴보기)
    // sdk에서는 key = code 이고, 단순하게 더 빠르게 조회하기 위한 장치역할
    versionId,
    countryId,
    industryId,
    teamId,
    mainCategoryId,
    subCategoryId,
    bmId,
  }: IGetCodeForCreateOptions): Promise<IGetCodeForCreate> {
    // IGetCodeForCreateOptions 등 type을 지정한 이유 알아보기
    const { code: versionCode } = await this.versionsService.getById(versionId);
    const { code: countryCode } =
      await this.countriesService.getCountryOfVersion(countryId, versionId);
    const {
      code: industryCode,
      maxTeamCode,
      maxProjectCode,
    } = await this.industriesService.getIndustryOfVersion(
      industryId,
      versionId,
    );

    const teamCode = await this.projectsCalculatecodeService.extractTeamCode(
      maxTeamCode,
      {
        versionId,
        teamId,
        mainCategoryId,
        subCategoryId,
        industryId,
        countryId,
      },
    );
    const projectCode =
      await this.projectsCalculatecodeService.extractProjectCode(
        maxProjectCode,
        {
          versionId,
          countryId,
          industryId,
          teamId,
          mainCategoryId,
          subCategoryId,
        },
      );

    const mainCategoryCode: number | null = mainCategoryId
      ? await this.mainCategoriesService.getCodeOfIndustry(
          mainCategoryId,
          industryId,
        )
      : null;
    const subCategoryCode: number | null = subCategoryId
      ? await this.subCategoriesService.getCodeById(subCategoryId)
      : null;
    const bmCode = bmId ? await this.bmsService.getCodeById(bmId) : null;

    return {
      code: projectCode,
      versionCode,
      countryCode,
      industryCode,
      teamCode,
      mainCategoryCode,
      subCategoryCode,
      bmCode,
    };
  }

  public async findActiveById(projectId: number) {
    const result = await this.projectsRepository.findByIdWithBms(projectId);

    if (!result || result.status !== ProjectStatus.ACTIVE) {
      throw new NotFoundException(ProjectsError.NOT_FOUND_PROJECTS);
    }

    return result;
  }

  public async create(
    dto: Omit<CreateProjectsBodyRequestDto, 'bannerImage'>,
    bannerImage?: Express.Multer.File,
  ) {
    const {
      versionId,
      countryId,
      industryId,
      mainCategoryId,
      subCategoryId,
      teamId,
      bmId,
    } = dto;

    if (!mainCategoryId && subCategoryId) {
      throw new ForbiddenException(ProjectsError.VALIDATE_MAIN_SUB_CATEGORY);
    }

    const {
      code,
      versionCode,
      countryCode,
      industryCode,
      teamCode,
      mainCategoryCode,
      subCategoryCode,
      bmCode,
    } = await this.getCodesForCreate({
      versionId,
      countryId,
      industryId,
      mainCategoryId,
      subCategoryId,
      teamId,
      bmId,
    });

    const data: Prisma.ProjectsCreateInput = {
      bannerImage: await this.getBannerImageUrl(bannerImage),
      status: ProjectStatus.ACTIVE,
      code,
      versionCode,
      countryCode,
      industryCode,
      teamCode,
      mainCategoryCode,
      subCategoryCode,
      bmCode,
      ...dto,
    };

    return this.projectsRepository.create(data);
  }

  public async findByConditions(
    dto: GetProjectsQueryRequestDto,
  ): Promise<GetProjectsResponseDto> {
    const [projects, total] = await this.projectsRepository.findByConditions(
      dto,
    );

    return {
      projects: _.isEmpty(projects)
        ? null
        : JsonService.parseForBigintType(projects),
      total,
    };
  }
}
