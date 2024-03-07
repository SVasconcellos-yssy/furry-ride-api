import { carType } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  passengerId: string;

  @IsString()
  driverId: string;

  @IsString()
  startLocation: string;

  @IsString()
  endLocation: string;

  @IsEnum(carType)
  carType: carType

  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @IsDateString()
  @IsOptional()
  endTime?: Date;
}
