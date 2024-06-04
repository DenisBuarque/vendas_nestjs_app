import { Column, Entity } from "typeorm";

Entity()
export class AuthEntity {
    @Column({type:'varchar', name: 'email', length: 50, nullable: false})
    email: string

    @Column({type: 'varchar', name: 'password', length: 255, nullable: false})
    password: string
}
