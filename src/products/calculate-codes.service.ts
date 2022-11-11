import { ForbiddenException, Injectable } from '@nestjs/common';
import { isNumberExistIncludingZero } from 'src/shared/validate';
import { ProductsError } from './error';
import { ProductsRepository } from './repository/products.repository';

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
  constructor(private readonly productsRepository: ProductsRepository) {}

  private async calculateUserCode(userId: number, projectId: number) {
    const product = await this.productsRepository.getByUserIdAndProjectId(
      userId,
      projectId,
    );
    if (!product || !isNumberExistIncludingZero(product.userCode)) {
      const {
        _max: { userCode },
      } = await this.productsRepository.getUserMaxCode(projectId);

      return isNumberExistIncludingZero(userCode) ? userCode + 1 : 0;
    }

    return product.userCode;
  }

  public async extractUserCode({
    userId,
    projectId,
    maxUserCode,
  }: //maxUserCode?
  IExtractUserCode): Promise<number> {
    const userCode = await this.calculateUserCode(userId, projectId);

    if (maxUserCode < userCode) {
      throw new ForbiddenException(
        ProductsError.USER_CODE_BETTER_THAN_MAX_CODE,
      );
    }

    return userCode;
  }

  private async calculateProductCodeByProjectId(
    projectId: number,
    userCode?: number,
  ): Promise<number> {
    // NOTE: Program 용일 경우 userCode 와 project(bm) 별로 Product Max Code 값을 계산해야 한다.
    const {
      _max: { code },
    } = userCode
      ? await this.productsRepository.getMaxCodeByProjectIdForProgram(
          projectId,
          userCode,
        )
      : await this.productsRepository.getMaxCodeByProjectId(projectId);

    return isNumberExistIncludingZero(code) ? code + 1 : 0;
  }

  public async extractProductCode({
    projectId,
    userCode,
    maxProductCode,
  }: IExtractProductCode): Promise<number> {
    const productCode = await this.calculateProductCodeByProjectId(
      projectId,
      userCode,
    );
    if (maxProductCode < productCode) {
      throw new ForbiddenException(
        ProductsError.PRODUCT_CODE_BETTER_THAN_MAX_CODE,
      );
    }

    return productCode;
  }
}
