import { PayloadToken } from '@/common/types/payloadToken.type';
import { rootConfig } from '@/configs/const.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: rootConfig.JWT_REFRESH_SECRET as string,
    });
  }

  async validate(payload: PayloadToken) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.sub,
      email: payload.email,
      systemRole: payload.systemRole,
    };
  }
}
