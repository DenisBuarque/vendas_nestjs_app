import { IsNotEmpty, IsString } from "class-validator"

export class UpdatePasswordDTO {

    @IsString()
    @IsNotEmpty()
    newPassword: string

    @IsString()
    @IsNotEmpty()
    oldPassword: string
}