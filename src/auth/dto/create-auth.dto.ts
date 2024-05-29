import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    readonly password: string

}
