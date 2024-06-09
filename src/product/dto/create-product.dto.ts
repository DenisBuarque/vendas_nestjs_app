import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50, { message: 'Digite no máximo 50 caracteres.'})
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2})
    readonly price: number

    @IsString()
    @IsNotEmpty()
    readonly description: string

    @IsOptional()
    @IsString()
    image?: string

    @IsOptional()
    @IsDate()
    readonly createAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?: Date
}
