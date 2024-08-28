import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
