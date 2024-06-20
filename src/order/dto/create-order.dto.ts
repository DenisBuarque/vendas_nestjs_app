import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  addressId: number;

  @IsNotEmpty()
  @IsNumber()
  paymentId: number;

  @IsNotEmpty()
  @IsDate()
  currentDate: Date;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
