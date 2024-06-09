import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories'})
export class CategoryEntity {
    @PrimaryGeneratedColumn('increment', { type: 'number', name: 'id'})
    id: number

    @Column({ type: 'varchar', name: 'name', length: 30, unique: true, nullable: false })
    name: string

    @CreateDateColumn({ type: Date, name: 'createdAt', nullable: true})
    createdAt?: Date

    @UpdateDateColumn({ type: Date, name: 'createdAt', nullable: true})
    updatedAt?: Date
}
