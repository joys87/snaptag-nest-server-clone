import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Industries, Status } from '@prisma/client';
import { IndustriesError } from './error';
import { IndustriesRepository } from './industries.repository';

@Injectable()
export class IndustriesService {
  constructor(private readonly industriesRepository: IndustriesRepository) {}

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
