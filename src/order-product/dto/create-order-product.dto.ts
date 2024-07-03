import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsNumber()
  readonly orderId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly price: number;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;
}
