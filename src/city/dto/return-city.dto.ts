import { ReturnStateDto } from "src/state/dto/return-state.dto";
import { CityEntity } from "../entities/city.entity";

export class ReturnCityDto {
    name: string;
    state: ReturnStateDto;

    constructor(cityEntity: CityEntity) {
        this.name = cityEntity.name;
        this.state = cityEntity.state ? new ReturnStateDto(cityEntity.state) : undefined;
    }
}