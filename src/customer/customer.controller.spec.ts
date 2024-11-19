import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('CustomerController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService, PrismaService],
      imports: [PrismaModule],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  describe('customer controller', () => {
    it('should return the input payload', async () => {
      const payload = {
        name: ' tester_customer_controller',
        email: 'tester@testers.com',
      };

      const result = await customerController.createCustomer(payload);

      expect(result.name).toEqual(payload.name);
      expect(result.email).toEqual(payload.email);
    });

    it('should create a customer', async () => {
      const payload = {
        name: ' tester',
        email: 'tester@testers.com',
      };

      const createdCustomer = await customerController.createCustomer(payload);

      const result = await customerController.findByID(createdCustomer.id);

      expect(result.name).toEqual(payload.name);
      expect(result.email).toEqual(payload.email);
    });
  });
});
