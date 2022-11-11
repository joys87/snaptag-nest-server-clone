import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProductsError } from 'src/products/error';
import { ProductsRepository } from 'src/products/repository/products.repository';
import { isNumberExistIncludingZero } from 'src/shared/validate';
import { ProjectsError } from '../error';
import { ProjectsRepository } from '../projects.repository';
import { ICalculateTeamCodeOptions, IGetMaxCodeByIdsOptions } from '../type';

interface IExtractProductCode {
  projectId: number;
  userCode?: number;
  maxProductCode: bigint;
}

interface IExtractUserCode {
  userId: number;
  projectId: number;
  maxUserCode: bigint;
}

@Injectable()
export class CalculateCodesService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  private async calculateTeamCode({
    teamId,
    ...ids
  }: ICalculateTeamCodeOptions): Promise<number> {
    const project = await this.projectsRepository.getByTeamId(teamId);
    if (!project || !isNumberExistIncludingZero(project.teamCode)) {
      const {
        _max: { teamCode },
      } = await this.projectsRepository.getMaxTeamCodeByIds(ids);

      return isNumberExistIncludingZero(teamCode) ? teamCode + 1 : 0;
    }
    return project.teamCode;
  }

  

  public async extractTeamCode(
    maxTeamCode: bigint,
    calcOptions: ICalculateTeamCodeOptions,
  ) {
    const teamCode = await this.calculateTeamCode(calcOptions);

    if (teamCode > maxTeamCode) {
      throw new ForbiddenException(ProjectsError.EXCEED_MAX_TEAM_CODE);
    }

    return teamCode;
  }

  private async calculateProjectCode(
    ids: IGetMaxCodeByIdsOptions,
  ): Promise<number> {
    const {
      _max: { code },
    } = await this.projectsRepository.getMaxCodeByIds(ids);

    return isNumberExistIncludingZero(code) ? code + 1 : 0;
  }

  public async extractProjectCode(
    maxProjectCode: bigint,
    calcOptions: IGetMaxCodeByIdsOptions,
  ) {
    const projectCode = await this.calculateProjectCode(calcOptions);

    if (projectCode > maxProjectCode) {
      throw new ForbiddenException(ProjectsError.EXCEED_MAX_PROJECT_CODE);
    }

    return projectCode;
  }
}
