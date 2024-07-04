import { AddressEntity } from "../entities/address.entity";
import { ReturnUserDTO } from "src/user/dto/return-user.dto";

export class ReturnAddressDTO {

    id: number;
    zip_code: string;
    address: string;
    numberAddress: string;
    district: string;
    user?: ReturnUserDTO;

    constructor(address: AddressEntity) {
        this.id = address.id;
        this.zip_code = address.zip_code;
        this.address = address.address;
        this.numberAddress = address.numberAddress;
        this.district = address.district;
        this.user = address.user ? new ReturnUserDTO(address.user) : undefined;
    }
}