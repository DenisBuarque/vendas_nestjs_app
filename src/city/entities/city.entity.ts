import { AddressEntity } from "src/address/entities/address.entity";
import { StateEntity } from "src/state/entities/state.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cities'})
export class CityEntity {
    @PrimaryGeneratedColumn('increment', {name: 'id', unsigned: true })
    id: number;

    @Column({ type: 'varchar', name: 'name', nullable: false, length: 100 })
    name: string;
    
    @Column({ type: 'integer', name: 'state_id' })
    state_id: number;

    @CreateDateColumn({ type: Date, name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ type: Date, name: 'updatedAt' })
    updatedAt: Date;

    @ManyToOne(() => StateEntity, (state) => state.city_id)
    state: StateEntity

    @OneToMany(() => AddressEntity, (address) => address.city_id)
    adresses: AddressEntity[]
}
