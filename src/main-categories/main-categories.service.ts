import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MainCategoriesError } from './error';
import { MainCategoriesRepository } from './main-categories.repository';

@Injectable()
export class MainCategoriesService {
  constructor(
    private readonly mainCategoriesRepository: MainCategoriesRepository,
  ) {}

  public async getCodeOfIndustry(
    mainCategoryId: number,
    industryId: number,
  ): Promise<number> {
    const result = await this.mainCategoriesRepository.getById(mainCategoryId);

    if (!result) {
      throw new NotFoundException(MainCategoriesError.NOT_FOUND_MAIN_CATEGORY);
    }

    if (result.industryId !== industryId) {
      throw new ForbiddenException(
        MainCategoriesError.NOT_MAIN_CATEGORY_OF_INDUSTRY,
      );
    }

    return result.code;
  }
}
