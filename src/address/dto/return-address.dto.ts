import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDto {
    id: number;
    zip_code: string;
    address: string;
    house_number: number;
    complement: string;
    district: string;
    cityId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(addressEntity: AddressEntity) {
        this.id = addressEntity.id;
        this.zip_code = addressEntity.zip_code;
        this.address = addressEntity.address;
        this.house_number = addressEntity.house_number;
        this.complement = addressEntity.complement;
        this.district = addressEntity.district;
    }
}