import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    const { email, password } = data;

    if (password.length < 8) {
      throw new HttpException(
        'A senha deve conter mais de 8 caracteres',
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    data.password = hash;

    const userExist = await this.prisma.user.findFirst({
      where: {
        email
      },
    });

    if (userExist) {
      throw new HttpException(
        'Já existe um usuário com este email cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const { password } = data;

    if (password.length < 8) {
      throw new HttpException(
        'A senha deve conter mais de 8 caracteres',
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    data.password = hash;

    const userExist = await this.prisma.user.findFirst({
      where: {
        id
      },
    });

    if (!userExist) {
      throw new HttpException(
        'Usuário não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.user.update({
      where: {
        id
      },
      data,
    });

  }

  async remove(id: string) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExist) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
