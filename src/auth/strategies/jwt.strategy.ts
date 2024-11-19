import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Token } from '../auth.service';
import { PartnerService } from '../../partner/partner.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly partnerService: PartnerService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.jwt_partner;
        },
      ]),
    });
  }

  // token arrives decoded at this point of the request
  async validate(payload: Token) {
    return this.partnerService.findByID(payload.id);
  }
}
