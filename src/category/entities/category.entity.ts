import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories'})
export class CategoryEntity {
    @PrimaryGeneratedColumn('increment', {type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'name', nullable: false, unique: true, length: 50 })
    name: string;

    @CreateDateColumn({ type: Date, name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: Date, name: 'updated_at' })
    updatedAt: Date;

    // Relation
    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}
