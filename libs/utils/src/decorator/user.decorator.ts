import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersError } from 'src/users/error';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;

    if (!user.userId) {
      throw new UnauthorizedException(UsersError.VALIDATE_USER_TOKEN);
    }
    return data ? user?.[data] : user;
  },
);
