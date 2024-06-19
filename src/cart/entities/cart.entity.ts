import { CartProductEntity } from "../../cart-product/entities/cart-product.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'carts'})
export class CartEntity {

    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id'})
    id: number

    @Column({ type: 'boolean', name: 'active', nullable: false })
    active: boolean

    @CreateDateColumn({type: Date, name: 'createdAt'})
    createdAt: Date

    @UpdateDateColumn({ type: Date, name: 'updatedAt'})
    updatedAt: Date

    @Column({type: 'int', name: 'userId', nullable: false})
    userId: number

    @ManyToOne(() => UserEntity, (user) => user.carts)
    user: UserEntity

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
    cartProducts: CartProductEntity[]
}
