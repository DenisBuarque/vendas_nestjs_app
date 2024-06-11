import { CategoryEntity } from "../../category/entities/category.entity";
import { Column, CreateDateColumn, Double, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'products'})
export class ProductEntity {

    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    id: number

    @Column({ type: 'varchar', name: 'name', length: 50, nullable: false, unique: true})
    name: string

    @Column({ type: 'decimal', name: 'price', precision: 10, scale: 2, nullable: false })
    price: number

    @Column({ type: 'text', name: 'description'})
    description: string

    @Column({ type: 'varchar', name: 'image', length: 255 })
    image?: string

    @CreateDateColumn({ type: Date, name: 'createdAt'})
    createdAt?: Date

    @UpdateDateColumn({ type: Date, name: 'updatedAt'})
    updatedAt?: Date

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity
}
