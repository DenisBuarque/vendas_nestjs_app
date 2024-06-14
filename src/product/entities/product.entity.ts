import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";

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

    @Column({ type: 'number', name: 'categoryId'})
    categoryId: number

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn()
    category: CategoryEntity

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.product)
    cartProducts: CartProductEntity[]
}
