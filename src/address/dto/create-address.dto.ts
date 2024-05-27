import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateAddressDto {

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
    @IsDate()
    readonly createdAd?: Date

    @IsOptional()
    @IsDate()
    readonly updatedAd?: Date
}
