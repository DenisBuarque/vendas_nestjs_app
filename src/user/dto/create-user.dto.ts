export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly cpf: string;
    password: string;
    role?: string;
    readonly createdAt?: Date;
    updatedAt?: Date;
}