import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { claim as ClaimModel, Prisma } from '@prisma/client';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Get()
  listClaims(): Promise<ClaimModel[]> {
    return this.claimService.listClaims();
  }

  @Post()
  createClaim(@Body() data: Prisma.claimCreateInput): Promise<ClaimModel> {
    return this.claimService.createClaim(data);
  }

  @Post('/batch')
  batchCreateClaims(
    @Body() data: Prisma.claimCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.claimService.batchCreateClaims(data);
  }
}
