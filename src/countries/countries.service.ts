import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Countries, Status } from '@prisma/client';
import { CountriesRepository } from './countries.repository';
import { CountriesError } from './error';

@Injectable()
export class CountriesService {
  constructor(private readonly countriesRepository: CountriesRepository) {}

  public async getCountryOfVersion(
    countryId: number,
    versionId: number,
  ): Promise<Countries> {
    const result = await this.countriesRepository.getById(countryId);

    if (!result || result.status !== Status.ACTIVE) {
      throw new NotFoundException(CountriesError.NOT_FOUND_COUNTRIES);
    }

    if (result.versionId !== versionId) {
      throw new ForbiddenException(CountriesError.NOT_COUNTRY_OF_VERSION);
    }

    return result;
  }
}
