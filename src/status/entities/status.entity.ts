import { PaymentEntity } from "src/payment/entities/payment.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'status'})
export class StatusEntity {
    @PrimaryGeneratedColumn('increment', {type: "int", name: "id"})
    id: number

    @Column({type: "varchar", name: "name", length: 50, nullable: false})
    name: string

    @CreateDateColumn({ type: Date, name: "createdAt"})
    createdAt?: Date

    @UpdateDateColumn({ type: Date, name: "updatedAt"})
    updatedAt?: Date

    @OneToMany(() => PaymentEntity, (payment) => payment.status)
    payments: PaymentEntity[];
}
