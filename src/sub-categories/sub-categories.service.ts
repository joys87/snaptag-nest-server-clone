import { Injectable, NotFoundException } from '@nestjs/common';
import { SubCategoriesError } from './error';
import { SubCategoriesRepository } from './sub-categories.repository';

@Injectable()
export class SubCategoriesService {
  constructor(
    private readonly subCategoriesRepository: SubCategoriesRepository,
  ) {}

  public async getCodeById(categoryId: number): Promise<number> {
    const result = await this.subCategoriesRepository.getById(categoryId);

    if (!result) {
      throw new NotFoundException(SubCategoriesError.NOT_FOUND_SUB_CATEGORY);
    }

    return result.code;
  }
}
