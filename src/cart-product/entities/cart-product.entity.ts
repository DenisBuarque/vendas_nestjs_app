import { CartEntity } from "src/cart/entities/cart.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cart_Products'})
export class CartProductEntity {
    @PrimaryGeneratedColumn('increment',{ type: 'integer', name: 'id'})
    id: number

    @Column({ type: 'integer', name: 'cartId', nullable: false})
    cartId: number

    @Column({ type: 'integer', name: 'productId', nullable: false})
    productId: number

    @CreateDateColumn({ type: Date, name: 'createdAt'})
    createdAt: Date

    @UpdateDateColumn({ type: Date, name: 'updatedAt'})
    updatedAt: Date

    @ManyToMany(() => CartEntity, (cart) => cart.carts)
    @JoinTable()
    carts: CartEntity[];

    @ManyToMany(() => ProductEntity, (product) => product.products)
    @JoinTable()
    products: ProductEntity[];

}
