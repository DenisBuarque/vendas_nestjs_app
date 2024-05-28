import { AddressEntity } from 'src/address/entities/address.entity'
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne } from 'typeorm'

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({type: 'varchar', name: 'name', length: 50, nullable: false})
    name: string

    @Column({type: 'char', name: 'phone', length: 11, nullable: false})
    phone: string

    @Column({type: 'char', name: 'cpf', length: 14, nullable: false, unique: true})
    cpf: string

    @Column({ type: 'varchar', name: 'email', length: 50, nullable: false, unique: true})
    email: string

    @Column({type: 'varchar', name: 'password', length: 255, nullable: false})
    password: string

    @CreateDateColumn({type: Date, name: 'createdAt', nullable: true})
    createdAd: Date

    @UpdateDateColumn({type: Date, name: 'createdAd', nullable: true})
    updatedAt: Date

    @OneToOne(() => AddressEntity, (address) => address.user)
    address: AddressEntity
}
