import { CityEntity } from "src/city/entities/city.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'adresses'})
export class AddressEntity {
    @PrimaryGeneratedColumn('increment', {name: 'id', unsigned: true })
    id: number;

    @Column({ type: 'varchar', name: 'zip_code', nullable: false, length: 9 })
    zip_code: string;
    
    @Column({ type: 'varchar', name: 'address', nullable: false, length: 255 })
    address: string;

    @Column({ type: 'integer', name: 'house_number', nullable: false })
    house_number: number;

    @Column({ type: 'varchar', name: 'complement', length: 255 })
    complement: string;

    @Column({ type: 'integer', name: 'city_id', nullable: false })
    city_id: number;

    @Column({ type: 'integer', name: 'user_id', nullable: false  })
    user_id: number;

    @CreateDateColumn({ type: Date, name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ type: Date, name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CityEntity, (city) => city.adresses)
    city: CityEntity

    @ManyToOne(() => UserEntity, (user) => user.address)
    user: UserEntity
}
