import { Injectable } from '@nestjs/common';
import { customer as Customer, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const emailRegex = new RegExp(
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
);

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async uniqueCustomer(userWhereUniqueInput: Prisma.customerWhereUniqueInput) {
    const customer = await this.prisma.customer.findUnique({
      where: userWhereUniqueInput,
      include: {
        claim: true,
      },
    });

    const claimsPointValueSum: number = customer.claim.reduce(
      (accumulator, claim) => {
        return accumulator + claim.point_value;
      },
      0,
    );

    return {
      ...customer,
      claimsPointValueSum: claimsPointValueSum,
    };
  }

  async findByID(id: string) {
    const customer = await this.prisma.customer.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        claim: true,
      },
    });

    const claimsPointValueSum: number = customer.claim.reduce(
      (accumulator, claim) => {
        return accumulator + claim.point_value;
      },
      0,
    );

    return {
      ...customer,
      claimsPointValueSum: claimsPointValueSum,
    };
  }

  async customers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.customerWhereUniqueInput;
    where?: Prisma.customerWhereInput;
    orderBy?: Prisma.customerOrderByWithRelationInput;
  }): Promise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const customers = await this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        claim: true,
      },
    });

    const customersWithClaimsPointValueSum = customers.map((customer) => {
      const claimsPointValueSum: number = customer.claim.reduce(
        (accumulator, claim) => {
          return accumulator + claim.point_value;
        },
        0,
      );

      return {
        ...customer,
        claimsPointValueSum: claimsPointValueSum,
      };
    });
    return customersWithClaimsPointValueSum;
  }

  async createCustomer(data: Prisma.customerCreateInput): Promise<Customer> {
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email');
    }

    return this.prisma.customer.create({
      data,
    });
  }

  async updateCustomer(params: {
    where: Prisma.customerWhereUniqueInput;
    data: Prisma.customerUpdateInput;
  }): Promise<Customer> {
    const { where, data } = params;
    return this.prisma.customer.update({
      data,
      where,
    });
  }

  async deleteCustomer(
    where: Prisma.customerWhereUniqueInput,
  ): Promise<Customer> {
    return this.prisma.customer.delete({
      where,
    });
  }
}
