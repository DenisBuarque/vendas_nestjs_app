import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";

@Entity({ name: 'adresses'})
export class AddressEntity {

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({type: 'varchar', name: 'address', length: 100, nullable: false})
    address: string

    @Column({type: 'varchar', name: 'numberAddress', length: 10, nullable: false})
    numberAddress: string

    @Column({type: 'varchar', name: 'district', length: 50, nullable: false})
    district: string

    @CreateDateColumn({type: Date, name: 'createdAt'})
    createdAt: Date

    @UpdateDateColumn({type: Date, name: 'updatedAt'})
    updatedAt: Date

    @OneToOne(() => UserEntity, (user) => user.address)
    @JoinColumn()
    user: UserEntity
}
