import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderPaymentDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly addressId: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly amountPayment?: number;

  @IsOptional()
  @IsNumber()
  readonly code?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly datePayment?: Date;
}
