import { CategoryEntity } from "src/category/entities/category.entity";
import { Collection, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

Entity({ name: 'products'})
export class ProductEntity {

    @PrimaryGeneratedColumn('increment', { type: 'number', name: 'id', unsigned: true})
    id: number

    @Column({ type: 'varchar', name: 'name', length: 50, nullable: false, unique: true})
    name: string

    @Column({ type: 'number', name: 'price', length: 10, nullable: false })
    price: number

    @Column({ type: 'text', name: 'description'})
    description: string

    @Column({ type: 'string', name: 'image' })
    image?: string

    @CreateDateColumn({ type: Date, name: 'createAt'})
    createdAt?: Date

    @UpdateDateColumn({ type: Date, name: 'updatedAt'})
    updatedAt?: Date

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity
}
