import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown, OnModuleDestroy
{
  constructor() {
    super({
      datasourceUrl: process.env.DATABASE_URL,
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
  async onApplicationShutdown() {
    await this.$disconnect();
  }
  async onModuleInit() {
    await this.$connect();
  }
}
