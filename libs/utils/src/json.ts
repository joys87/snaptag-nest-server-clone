export class JsonService {
  public static parseForBigintType<T>(obj: object): T {
    const stringObj = JSON.stringify(obj, (_, v) =>
      typeof v === 'bigint' ? v.toString() : v,
    );

    return JSON.parse(stringObj);
  }
}
