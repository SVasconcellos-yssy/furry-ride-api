import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) { }

  
  async create(data: CreateTripDto) {
    const { startTime, ...restData } = data; 
    const newTrip = await this.prisma.trip.create({
      data: {
        ...restData, 
        startTime: startTime || new Date(),
      },
    });
    return newTrip;
  }

  async findAll() {
    return await this.prisma.trip.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.trip.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

 async update(id: string, data: UpdateTripDto) {
    return await this.prisma.user.update({
      where: {
        id
      },
      data,
    });

  }

  async remove(id: string) {
    const tripExist = await this.prisma.trip.findUnique({
      where: {
        id,
      },
    });

    if (!tripExist) {
      throw new HttpException('Viagem não encontrada', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.trip.delete({
      where: {
        id,
      },
    });
  }
}
