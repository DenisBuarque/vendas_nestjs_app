import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';
import { Entity } from 'typeorm';

@Entity({ name: 'payments' })
export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly statusId: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly price: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly discount: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly finalPrice: number;

  @IsString()
  @IsNotEmpty()
  readonly typePay: string;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;
}
