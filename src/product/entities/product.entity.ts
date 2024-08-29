import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'products'})
export class ProductEntity {
    @PrimaryGeneratedColumn('increment',{type: 'integer', name: 'id' })
    id: number;

    @Column({ type: 'varchar', name: 'name', nullable: false, unique: true, length: 50 })
    name: string;

    @Column({ type: 'varchar', name: 'description', nullable: false })
    description: string;

    @Column({ type: 'integer', name: 'price', nullable: false })
    price: number;

    @Column({ type: 'text', name: 'image', nullable: false })
    image: string;

    @Column({ type: 'integer', name: 'categoryId' })
    categoryId?: number;

    @CreateDateColumn({ type: Date, name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ type: Date, name: 'updatedAt' })
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn()
    category: CategoryEntity;

    @ManyToMany(() => CartProductEntity, (cartProduct) => cartProduct.products)
    @JoinTable()
    products: CartProductEntity[];
}
