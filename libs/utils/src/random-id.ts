import * as nanoid from 'nanoid';

export class RandomId {
  public static generateRandomId() {
    return nanoid.nanoid();
  }
}
