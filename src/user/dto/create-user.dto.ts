import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    readonly phone: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(14)
    readonly cpf: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @IsEmail()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: "A senha deve ter no minimo 6 caracteres"})
    @MaxLength(255)
    password: string

    @IsOptional()
    @IsDate()
    readonly createdAt?: Date

    @IsOptional()
    @IsDate()
    readonly updatedAt?: Date
}
