import { Role } from "../../enums/role.enum";

export const createUserMock = {
    name: 'Moanna',
    phone: '82954876322',
    cpf: '042.457.678-65',
    email: 'moanna@gmail.com',
    password: 'Moanna789@#',
    role: Role.User,
    createdAd: new Date(),
    updatedAt: new Date()
}