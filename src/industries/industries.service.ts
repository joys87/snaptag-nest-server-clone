import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Industries, Status } from '@prisma/client';
// import { Industries, Status } from '@prisma/client';
import { IndustriesError } from './error';
import { IndustriesRepository } from './industries.repository';

@Injectable()
export class IndustriesService {
  constructor(private readonly industriesRepository: IndustriesRepository) {}

  // public async findIndustries({
  //   versionId,
  // }: GetIndustriesQueryRequestDto): Promise<Industries[] | null> {
  //   const industries = await this.industriesRepository.findIndustries(
  //     versionId,
  //   );

  //   return _.isEmpty(industries)
  //     ? null
  //     : JsonService.parseForBigintType<Industries[]>(industries);
  // }

  private validateIndustry(industry: Industries | null) {
    if (!industry) {
      throw new NotFoundException(IndustriesError.NOT_FOUND_INDUSTRIES);
    }

    return industry;
  }

  public async findById(industryId: number): Promise<Industries> {
    const result = await this.industriesRepository.findById(industryId);

    return this.validateIndustry(result);
  }

  public async getIndustryOfVersion(
    industryId: number,
    versionId: number,
  ): Promise<Industries> {
    const result = await this.industriesRepository.getById(industryId);

    if (!result || result.status !== Status.ACTIVE) {
      throw new NotFoundException(IndustriesError.NOT_FOUND_INDUSTRIES);
    }

    if (result.versionId !== versionId) {
      throw new ForbiddenException(IndustriesError.NOT_INDUSTRY_OF_VERSION);
    }

    return result;
  }
}
