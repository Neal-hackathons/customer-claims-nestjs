import { Test, TestingModule } from '@nestjs/testing';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClaimModule } from '../claim/claim.module';

describe('PartnerController', () => {
  let controller: PartnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerController],
      providers: [PartnerService],
      imports: [PrismaModule, ClaimModule],
    }).compile();

    controller = module.get<PartnerController>(PartnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
