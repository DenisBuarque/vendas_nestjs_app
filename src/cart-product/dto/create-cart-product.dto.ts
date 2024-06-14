import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateCartProductDto {

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    readonly amount: number

    @IsNumber()
    @IsNotEmpty()
    readonly cartId: number

    @IsNumber()
    @IsNotEmpty()
    readonly productId: number

    @IsOptional()
    @IsDate()
    readonly createdAt?: Date

    @IsOptional()
    @IsDate()
    readonly updatedAd?: Date
}
