import { CartEntity } from '../../cart/entities/cart.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cart_product' })
export class CartProductEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'amount', nullable: false })
  amount: number;

  @CreateDateColumn({ type: Date, name: 'createdAt', nullable: true })
  createAd?: Date;

  @UpdateDateColumn({ type: Date, name: 'updatedAt', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'number', name: 'cartId', nullable: false })
  cartId: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cartProducts)
  @JoinColumn({ name: 'cartId', referencedColumnName: 'id' })
  cart: CartEntity;

  @Column({ type: 'int', name: 'productId', nullable: false })
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.cartProducts)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: ProductEntity;
}
