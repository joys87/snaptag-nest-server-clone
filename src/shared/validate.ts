export const isNumberExistIncludingZero = (num?: number): boolean =>
  !!(num === 0 || num);
// 느낌표 두 개, 이중부정은 뒤따르는 값을 boolean 값으로 만들어주기 위해 사용한다.
