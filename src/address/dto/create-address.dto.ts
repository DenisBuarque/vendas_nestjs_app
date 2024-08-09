import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAddressDto {

    @IsString()
    @IsNotEmpty()
    readonly zip_code: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    readonly address: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    readonly house_number: number;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    readonly complement?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly district: string;

    @IsNumber()
    @IsNotEmpty()
    readonly cityId: number;

    @IsNumber()
    readonly userId: number;

    @IsDate()
    @IsOptional()
    readonly createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
