import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cities'})
export class CityEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'id'})
    id: number

    @Column({type: 'varchar', name: 'name', length: 100, nullable: false, unique: true})
    name: string

    @Column({type: 'varchar', name: 'name', length: 100})
    state_id: number

    @CreateDateColumn({ type: Date, name: 'createdAt'})
    createdAt: Date

    @UpdateDateColumn({type: Date, name: 'updatedAt'})
    updatedAt: Date
}
