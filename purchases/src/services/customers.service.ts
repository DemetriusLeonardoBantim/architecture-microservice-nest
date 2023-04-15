import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findFirst({
      where: {
        authUserId,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    return await this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
