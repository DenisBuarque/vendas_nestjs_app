export class CreateUserDto {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    password: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}