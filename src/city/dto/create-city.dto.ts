import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateCityDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly name: string

    @IsNumber()
    @IsNotEmpty()
    @MaxLength(100)
    readonly stateId: number

    @IsOptional()
    @IsDate()
    readonly createdAt?: Date

    @IsOptional()
    @IsDate()
    readonly updatedAt?: Date
}
