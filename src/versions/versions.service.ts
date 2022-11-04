import { Injectable, NotFoundException } from '@nestjs/common';
import { Status, Versions } from '@prisma/client';
import { VersionsError } from './error';
import { VersionsRepository } from './versions.repository';
import * as _ from 'lodash';

@Injectable()
export class VersionsService {
  constructor(private readonly versionsRepository: VersionsRepository) {}

  public async getVersions(): Promise<Versions[] | null> {
    const result = await this.versionsRepository.getVersions();

    return _.isEmpty(result) ? null : result;
  }

  public async getById(versionId: number): Promise<Versions> {
    const result = await this.versionsRepository.getById(versionId);

    if (!result || result.status !== Status.ACTIVE) {
      throw new NotFoundException(VersionsError.NOT_FOUND_VERSIONS);
    }

    return result;
  }
}
