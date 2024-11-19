import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { PartnerAuthGuard } from './partner.guard';
import { AuthedPartner } from './partner.decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('partner/login')
  @UseGuards(PartnerAuthGuard)
  async loginPartner(
    @AuthedPartner() partner: { name: string; email: string; id: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.loginPartner(partner, response);
  }
}
