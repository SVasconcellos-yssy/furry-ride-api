import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) { }
  
  async create(data: CreatePaymentDto) {
    return await this.prisma.paymentInfo.create({data})
  }

 async  findAll() {
    return await this.prisma.paymentInfo.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.paymentInfo.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  async update(id: string, data: UpdatePaymentDto) {
    return await this.prisma.paymentInfo.update({
      where: {
        id
      },
      data,
    });
  }

 async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
