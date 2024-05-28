import { CityEntity } from "src/city/entities/city.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'states'})
export class StateEntity {

    @PrimaryGeneratedColumn('increment', { name: 'id'})
    id: number

    @Column({type: 'varchar', name: 'name', length: 50, nullable: false, unique: true})
    readonly name: string

    @Column({type: 'char', name: 'sigla', length: 2, nullable: false, unique: true})
    sigla: string

    @CreateDateColumn({type: Date, name: 'createdAt', nullable: true})
    createdAt: Date

    @UpdateDateColumn({ type: Date, name: 'updatedAt', nullable: true})
    updatedAt: Date

    @OneToMany(() => CityEntity, (city) => city.state)
    cities: CityEntity[]
}
