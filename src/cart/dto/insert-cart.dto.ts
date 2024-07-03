import { IsNotEmpty, IsNumber } from 'class-validator';

export class InsertCartDTO {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
