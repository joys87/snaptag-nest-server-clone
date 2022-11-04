import { Role } from '../type';

export class UserRequestDto {
  readonly userId: number;

  readonly role: Role;

  readonly iat: number;

  readonly exp: number;
}
