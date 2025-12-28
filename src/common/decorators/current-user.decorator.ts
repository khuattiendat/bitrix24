// src/auth/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadToken } from '../types/payloadToken.type';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PayloadToken => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
