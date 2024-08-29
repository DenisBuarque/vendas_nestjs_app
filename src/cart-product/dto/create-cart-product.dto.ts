import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCartProductDto {

    @IsNumber()
    @IsNotEmpty()
    readonly cartId: number;

    @IsNumber()
    @IsNotEmpty()
    readonly productId: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    readonly amount: number;

    @IsDate()
    @IsOptional()
    readonly createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
