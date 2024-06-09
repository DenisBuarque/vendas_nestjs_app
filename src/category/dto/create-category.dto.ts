import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsOptional()
    @MaxLength(30, { message: 'Digite no máximo 30 caracteres.'})
    @IsDate()
    readonly createdAt?: Date

    @IsOptional()
    @IsDate()
    updatedAt?: Date
}
