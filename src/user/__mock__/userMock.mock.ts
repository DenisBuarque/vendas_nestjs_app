import { Role } from "../../enums/role.enum";

export const userMock = {
    id: 1,
    name: 'Denis',
    phone: '82988365125',
    cpf: '042.267.141-12',
    email: 'denis@gmail.com',
    password: 'Denis789@#',
    role: Role.User,
    createdAd: new Date(),
    updatedAt: new Date()
}