import { StateEntity } from "../entities/state.entity";

export class ReturnStateDto {
    name: string;
    sigla: string;

    constructor(stateEntity: StateEntity) {
        this.name = stateEntity.name;
        this.sigla = stateEntity.sigla;
    }
}