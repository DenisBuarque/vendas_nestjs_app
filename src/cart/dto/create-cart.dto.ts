import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCartDto {

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number

    @IsBoolean()
    @IsNotEmpty()
    readonly active: boolean

    @IsOptional()
    @IsDate()
    readonly createdAt?: Date

    @IsOptional()
    @IsDate()
    readonly updatedAt?: Date
}
