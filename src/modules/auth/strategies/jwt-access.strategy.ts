import { PayloadToken } from '@/common/types/payloadToken.type';
import { rootConfig } from '@/configs/const.config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: rootConfig.JWT_ACCESS_SECRET as string,
    });
  }

  async validate(payload: PayloadToken) {
    return {
      id: payload.sub,
      email: payload.email,
      system_role: payload.system_role,
    };
  }
}
