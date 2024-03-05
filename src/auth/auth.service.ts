import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      throw new HttpException(
        'Incorrect Email or Password',
        HttpStatus.BAD_REQUEST,
      );

    const { password } = user;

    const isMatch = await bcrypt.compare(pass, password);

    if (!isMatch)
      throw new HttpException(
        'Incorrect Email or Password',
        HttpStatus.BAD_REQUEST,
      );

    const payload = { sub: user.id, name: user.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
