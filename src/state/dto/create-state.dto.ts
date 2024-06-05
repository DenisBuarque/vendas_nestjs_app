import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator"

export class CreateStateDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @Min(2, { message: "O sigla deve conter no minimo 2 caracteres"})
    @MaxLength(2)
    readonly sigla: string

    @IsOptional()
    @IsDate()
    readonly createdAt?: Date

    @IsOptional()
    @IsDate()
    readonly updatedAt?: Date
}
