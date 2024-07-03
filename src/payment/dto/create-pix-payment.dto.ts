import { PartialType } from '@nestjs/mapped-types';
import { Entity } from 'typeorm';
import { CreatePaymentDto } from './create-payment.dto';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

@Entity()
export class CreatePixPaymentDto extends PartialType(CreatePaymentDto) {
  @IsOptional()
  @IsNumber()
  readonly code?: number;

  @IsOptional()
  @IsDate()
  readonly datePayment?: Date;
}
