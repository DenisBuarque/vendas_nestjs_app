import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateAddressDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(9)
    readonly zip_code: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly address: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    readonly numberAddress: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly district: string

    @IsOptional()
    @IsNumber()
    userId?: number

    @IsNumber()
    @IsNotEmpty()
    readonly cityId: number

    @IsOptional()
    @IsDate()
    readonly createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?: Date
}
