import { PartialType } from '@nestjs/mapped-types';
import { Entity } from 'typeorm';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNumber, IsOptional } from 'class-validator';

@Entity()
export class CreateCreditCardPaymentDto extends PartialType(CreatePaymentDto) {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly amountPayment?: number;
}
