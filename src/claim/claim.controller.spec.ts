import { Test, TestingModule } from '@nestjs/testing';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { CustomerController } from '../customer/customer.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerService } from '../customer/customer.service';

describe('ClaimController', () => {
  let controller: ClaimController;
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController, ClaimController],
      providers: [CustomerService, ClaimService],
      imports: [PrismaModule],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
    controller = app.get<ClaimController>(ClaimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('claim controller', () => {
    it('should create a claim for the given customer', async () => {
      const customerControllerPayload = {
        name: ' tester_claim_controller' + crypto.randomUUID(),
        email: 'tester@testers.com',
      };

      const customerResult = await customerController.createCustomer(
        customerControllerPayload,
      );

      const payload: Prisma.claimCreateInput = {
        title: 'my truck broke',
        description: 'read the title',
        point_value: 1000,
        Customer: {
          connect: {
            id: customerResult.id,
          },
        },
      };

      const result = await controller.createClaim(payload);

      expect(result.id).toBeDefined();
      expect(result.title).toEqual(payload.title);
      expect(result.description).toEqual(payload.description);
      expect(result.point_value).toEqual(payload.point_value);
      expect(result.customer).toEqual(customerResult.id);
    });

    it('should create multiple claims for the given customer', async () => {
      const customerControllerPayload = {
        name: 'tester_claim_controller' + crypto.randomUUID(),
        email: 'tester@testers.com',
      };

      const customerResult = await customerController.createCustomer(
        customerControllerPayload,
      );

      const payload: Prisma.claimCreateManyInput[] = [
        {
          title: 'my girlfriend left me for my little brother',
          description: 'want compensation',
          point_value: 1000,
          customer: customerResult.id,
        },
        {
          title: 'my girlfriend  took the dog when she left',
          description:
            "I'm more upset about the dog than her leaving. Need insurance money for a new dog",
          point_value: 2000,
          customer: customerResult.id,
        },
      ];
      const result = await controller.batchCreateClaims(payload);

      expect(result.count).toEqual(payload.length);
    });
  });
});
