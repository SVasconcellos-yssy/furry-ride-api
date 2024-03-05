import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum } from 'class-validator';

enum UserRole {
    DRIVER = 'DRIVER',
    PASSENGER = 'PASSENGER'
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsEnum(UserRole)
    role?: UserRole;
}
