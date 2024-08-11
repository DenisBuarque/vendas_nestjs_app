import { ReturnUserDto } from "src/user/dto/return-user.dto";

export class ReturnSingInDto {
    user: ReturnUserDto;
    token: string;
}