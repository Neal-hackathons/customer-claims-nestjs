import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

@Injectable()
export class PartnerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPartner(data: Prisma.partnerCreateInput) {
    const password_hash = await hash(data.password, 10);
    return this.prismaService.partner.create({
      data: {
        ...data,
        password: password_hash,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.partner.findUnique({
      where: {
        email,
      },
    });
  }

  async findByID(id: string) {
    return this.prismaService.partner.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string) {
    return this.prismaService.partner.findFirst({
      where: {
        name,
      },
    });
  }
}
