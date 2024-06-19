import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateCartProductDto {

    @IsNumber()
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
    updatedAt?: Date
}
