import { IsString, IsEmail, MinLength, IsNotEmpty, IsEnum } from 'class-validator';

enum UserRole {
    DRIVER = 'DRIVER',
    PASSENGER = 'PASSENGER'
}

export class CreateUserDto {
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