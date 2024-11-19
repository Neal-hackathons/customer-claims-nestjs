import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { ClaimService } from '../claim/claim.service';
import { PartnerJwtGuard } from '../auth/partner.guard';
import { Prisma } from '@prisma/client';

@Controller('partner')
export class PartnerController {
  constructor(
    private readonly partnerService: PartnerService,
    private readonly claimService: ClaimService,
  ) {}

  @Post('/')
  async createPartner(
    @Body() data: { name: string; email: string; password: string },
  ) {
    const createdPartner = await this.partnerService.createPartner(data);

    const result = {
      name: createdPartner.name,
      email: createdPartner.email,
      id: createdPartner.id,
    };

    return result;
  }

  @Post('/claim/create')
  @UseGuards(PartnerJwtGuard)
  async createClaim(@Body() data: Prisma.claimCreateInput) {
    return this.claimService.createClaim(data);
  }
}
