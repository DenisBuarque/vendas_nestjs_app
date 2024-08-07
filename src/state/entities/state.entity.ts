import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'states' })
export class StateEntity {
    @PrimaryGeneratedColumn('increment', { name: 'id', unsigned: true })
    id: number;

    @Column({ type: 'varchar', name: 'name', nullable: false, length: 100, unique: true })
    name: string;

    @Column({ type: 'char', name: 'sigla', nullable: false, length: 2, unique: true })
    sigla: string;

    @CreateDateColumn({ type: Date, name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ type: Date, name: 'updatedAt' })
    updatedAt: Date;
}