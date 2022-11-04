import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Status, Teams } from '@prisma/client';
import * as _ from 'lodash';
import { PrismaService } from 'src/prisma';
import { IUploadImage } from 'src/upload-image/upload-image.interface';
// import { UploadImageService } from 'src/upload-image/upload-image.service';
import { CreateTeamsRequestDto } from './dtos/create-teams-request.dto';
import { GetTeamRequestDto } from './dtos/get-teams-request.dto';
import { GetTeamsWithProjectsQueryRequestDto } from './dtos/get-teams-with-projects-request.dto';
import { TeamsRepository } from './teams.repository';

@Injectable()
export class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private readonly prismaService: PrismaService,
    private readonly uploadImageService: IUploadImage,
  ) // 종속성 문제를 해결하기 위해 추상클래스인 IUploadImagefmf 생성자 기반으로 불러옴
  // 관련된 아티클 기사 https://dev.to/ef/nestjs-dependency-injection-with-abstract-classes-4g65
  {}

  public async create({
    logoImage,
    businessImage,
    ...rest
  }: CreateTeamsRequestDto) {
    const logoImageUrl = logoImage
      ? await this.uploadImageService.getUploadImageUrl(logoImage, 'teams')
      : null;

    const businessImageUrl = businessImage
      ? await this.uploadImageService.getUploadImageUrl(businessImage, 'teams')
      : null;
    // const logoImageUrl = null;

    // const businessImageUrl = null;

    try {
      return await this.teamsRepository.create({
        ...rest,
        logoImage: logoImageUrl,
        businessImage: businessImageUrl,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getTeams({
    page,
    pageSize,
  }: GetTeamRequestDto): Promise<Teams[] | null> {
    const result = await this.prismaService.teams.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        status: Status.ACTIVE,
      },
      orderBy: {
        created: 'desc',
      },
    });

    return _.isEmpty(result) ? null : result;
  }

  public async getTeamsWithProjects({
    page,
    pageSize,
  }: GetTeamsWithProjectsQueryRequestDto) {
    const result = await this.prismaService.teams.findMany({
      skip: pageSize * (page - 1),
      take: pageSize,
      include: {
        projects: true,
      },
      where: {
        status: Status.ACTIVE,
      },
      orderBy: {
        created: 'desc',
      },
    });

    return _.isEmpty(result) ? null : result;
  }
}

// public getTeams(page: number, pageSize: number): Promise<Teams[]> {
//     return this.prismaService.teams.findMany({
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//       where: {
//         status: Status.ACTIVE,
//       },
//       orderBy: {
//         created: 'desc',
//       },
//     });
//   }
