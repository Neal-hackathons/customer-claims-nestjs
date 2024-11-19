import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PartnerService } from '../partner/partner.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export type Token = {
  id: string;
  name: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly partnerService: PartnerService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyPartner(email: string, password: string) {
    const partner = await this.partnerService.findByEmail(email);

    const authenticated = compare(password, partner.password);

    if (!authenticated) {
      throw new UnauthorizedException('NO');
    }

    return { name: partner.name, email: partner.email, id: partner.id };
  }

  async loginPartner(
    partner: { name: string; email: string; id: string },
    response: Response,
  ) {
    const oneHour = 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const expiresIn = currentTime + new Date().setMilliseconds(oneHour);

    const tokenPayload: Token = {
      id: partner.id,
      name: partner.name,
    };

    const jwt = this.jwtService.sign(tokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: expiresIn,
    });

    response.cookie('jwt_partner', jwt, {
      httpOnly: true,
      expires: new Date(expiresIn),
    });
  }
}
