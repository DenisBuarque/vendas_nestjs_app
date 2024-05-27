import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string

    @Column({type: 'varchar', name: 'name', length: 50, nullable: false})
    name: string

    @Column({type: 'char', name: 'phone', length: 11, nullable: false})
    phone: string

    @Column({type: 'char', name: 'cpf', length: 14, nullable: false})
    cpf: string

    @Column({type: 'varchar', name: 'password', length: 255, nullable: false})
    password: string

    @CreateDateColumn({type: Date, name: 'createdAt', nullable: true})
    createdAd: Date

    @UpdateDateColumn({type: Date, name: 'createdAd', nullable: true})
    updatedAt: Date
}
