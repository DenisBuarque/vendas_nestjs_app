import { StateEntity } from "../entities/state.entity";

export class ReturnStateDto {
    id: number;
    name: string;
    sigla: string;

    constructor(stateEntity: StateEntity) {
        this.id = stateEntity.id;
        this.name = stateEntity.name;
        this.sigla = stateEntity.sigla;
    }
}