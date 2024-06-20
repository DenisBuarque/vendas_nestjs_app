import { AddressEntity } from 'src/address/entities/address.entity';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'userId', nullable: false })
  userId: number;

  @Column({ type: 'int', name: 'addressId', nullable: false })
  addressId: number;

  @Column({ type: 'int', name: 'paymentId', nullable: false })
  paymentId: number;

  @Column({ type: Date, name: 'currentDate', nullable: false })
  currentDate: Date;

  @CreateDateColumn({ type: Date, name: 'createdAt', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: Date, name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: "userId", referencedColumnName: "id"})
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.orders)
  @JoinColumn({ name: "addressId", referencedColumnName: "id"})
  address: AddressEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.orders)
  @JoinColumn({ name: "paymentId", referencedColumnName: "id"})
  payment: PaymentEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  orderProduct: OrderProductEntity[];
}
