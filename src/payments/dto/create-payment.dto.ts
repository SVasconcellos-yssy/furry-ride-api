import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  passengerId: string;

  @IsString()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  expiration: Date;

  @IsString()
  @IsNotEmpty()
  cvv: string;
}
