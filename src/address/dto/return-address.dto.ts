import { ReturnCityDto } from "src/city/dto/return-city.dto";
import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDto {
    id: number;
    zip_code: string;
    address: string;
    house_number: number;
    complement: string;
    district: string;
    city: ReturnCityDto;

    constructor(addressEntity: AddressEntity) {
        this.id = addressEntity.id;
        this.zip_code = addressEntity.zip_code;
        this.address = addressEntity.address;
        this.house_number = addressEntity.house_number;
        this.complement = addressEntity.complement;
        this.district = addressEntity.district;
        this.city = addressEntity.city ? new ReturnCityDto(addressEntity.city) : undefined;
    }
}