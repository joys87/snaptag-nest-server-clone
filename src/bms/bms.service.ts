import { Injectable, NotFoundException } from '@nestjs/common';
import { BmsRepository } from './bms.repository';
import { BmsError } from './error';

@Injectable()
export class BmsService {
  constructor(private readonly bmsRepository: BmsRepository) {}

  public async getCodeById(bmId: number): Promise<number> {
    const result = await this.bmsRepository.getById(bmId);

    if (!result) {
      throw new NotFoundException(BmsError.NOT_FOUND_BMS);
    }

    return result.code;
  }
}
