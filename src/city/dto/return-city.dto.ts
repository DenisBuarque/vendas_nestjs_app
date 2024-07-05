import { ReturnStateDTO } from "../../state/dto/return-state.dto";
import { CityEntity } from "../entities/city.entity";

export class ReturnCityDTO {

    id: number;
    name: string;
    stateId: number;
    state?: ReturnStateDTO;
    
    constructor(city: CityEntity){
        this.id = city.id;
        this.name = city.name;
        this.stateId = city.stateId;
        this.state = city.state ? new ReturnStateDTO(city.state) : undefined;
    }
}