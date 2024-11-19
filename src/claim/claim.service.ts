import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { claim as ClaimModel } from '@prisma/client';

@Injectable()
export class ClaimService {
  constructor(private readonly prismaService: PrismaService) {}

  async listClaims(): Promise<ClaimModel[]> {
    return this.prismaService.claim.findMany();
  }

  async createClaim(data: Prisma.claimCreateInput): Promise<ClaimModel> {
    if (!data.Customer.connect.id) {
      throw new Error('customer is required');
    }

    return this.prismaService.claim.create({
      data,
    });
  }

  async batchCreateClaims(data: Prisma.claimCreateManyInput[]) {
    const isBatchClaimsForSameCustomerID = data.every(
      (claim) => claim.customer === data[0].customer,
    );

    if (!isBatchClaimsForSameCustomerID) {
      throw new Error('all claims must be for the same customer');
    }

    return this.prismaService.claim.createMany({
      data: data,
    });
  }
}
