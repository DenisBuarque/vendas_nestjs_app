import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'carts'})
export class CartEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id'})
    id: number;

    @Column({ type: 'integer', name: 'userId', nullable: false})
    userId: number;

    @CreateDateColumn({ type: Date, name: 'createdAt'})
    createdAt?: Date;

    @UpdateDateColumn({ type: Date, name: 'updatedAt'})
    updatedAt?: Date;

    @OneToOne(() => UserEntity, (user) => user.cart)
    @JoinColumn()
    user: UserEntity;

    @ManyToMany(() => CartProductEntity, (cartProduct) => cartProduct.carts)
    @JoinTable()
    carts: CartProductEntity[];
}
