import { ReturnCityDTO } from "src/city/dto/return-city.dto";
import { StateEntity } from "../entities/state.entity";
import { CityEntity } from "src/city/entities/city.entity";

export class ReturnStateDTO {
    id: number;
    name: string;
    sigla: string;
    cities: CityEntity[];

    constructor(state: StateEntity) {
        this.id = state.id;
        this.name = state.name;
        this.sigla = state.sigla;
        this.cities = state.cities;
    }
}