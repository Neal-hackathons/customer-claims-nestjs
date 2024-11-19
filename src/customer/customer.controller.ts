import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { customer as CustomerModel } from '@prisma/client';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/')
  async list(): Promise<CustomerModel[]> {
    return this.customerService.customers({});
  }

  @Post('/')
  async createCustomer(
    @Body() body: { name: string; email: string },
  ): Promise<CustomerModel> {
    return this.customerService.createCustomer({
      email: body.email,
      name: body.name,
      id: crypto.randomUUID(),
    });
  }

  @Get('/:id')
  async findByID(@Param('id') id: string): Promise<CustomerModel> {
    return this.customerService.findByID(id);
  }
}
