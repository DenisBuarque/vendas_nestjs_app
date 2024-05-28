import { StateEntity } from "src/state/entities/state.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cities'})
export class CityEntity {

    @PrimaryGeneratedColumn('increment', { name: 'id'})
    id: number

    @Column({type: 'varchar', name: 'name', length: 100, nullable: false, unique: true})
    name: string

    @CreateDateColumn({ type: Date, name: 'createdAt'})
    createdAt: Date

    @UpdateDateColumn({type: Date, name: 'updatedAt'})
    updatedAt: Date

    @ManyToOne(() => StateEntity, (state) => state.cities)
    state: StateEntity
}
