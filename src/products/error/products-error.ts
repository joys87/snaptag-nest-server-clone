export class ProductsError {
  public static NOT_FOUND_PRODUCTS = '제품을 찾을 수 없습니다';

  public static PRODUCT_CODE_BETTER_THAN_MAX_CODE =
    '제품 Code 값이 최대 값을 넘었습니다';

  public static NOT_FOUND_SOURCE_IMAGE = 'source 이미지를 찾을 수 없습니다';

  public static FORBIDDEN_IMAGE = 'Labcode 이미지가 아닙니다';

  public static NOT_PROGRAM_IMAGE = '프로그램용 이미지가 아닙니다';

  public static NOT_VARIABLE_PRODUCT_INDUSTRY =
    '가변용 제품의 산업군이 아닙니다';

  public static NOT_INDUSTRY_THREE_BM_CODE =
    '산업군 3번에 해당하는 Bm Code 가 아닙니다';

  public static FAILED_CREATE_VARIABLE_PRODUCTS = '가변용 제품 생성 실패';

  public static NOT_FOUND_PROJECT_BMS = '제품용 BM 을 찾을 수 없습니다';

  public static USER_CODE_BETTER_THAN_MAX_CODE =
    '유저 Code 값이 최대 값을 넘었습니다';

  public static NUMBER_OF_AMOUNT_AND_URLS_NOT_MATCH =
    '제품의 양과 Url 의 수가 일치하지 않습니다';

  public static INDUSTRY_THREE_NEED_BM_CODE =
    '산업군 3번은 ProjectCode 는 필요없고 BmCode 가 반드시 필요합니다';

  public static NOT_NEED_BM_CODE =
    '산업군 3 번이 아니면 BmCode 는 필요하지 않습니다';

  public static EXCEEDED_PRODUCTS_MAX_CREATIONS = `최대 제품 생성 개수를 넘어섰습니다`;

  public static NOT_USER_PRODUCT = '유저의 제품이 아니면 수정할 수 없습니다';
}
