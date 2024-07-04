import { OrderEntity } from '../../order/entities/order.entity';
import { StatusEntity } from '../../status/entities/status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class PaymentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'statusId', nullable: false })
  statusId: number;

  @Column({
    type: 'decimal',
    name: 'price',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'decimal',
    name: 'discount',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  discount: number;

  @Column({
    type: 'decimal',
    name: 'finalPrice',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  finalPrice: number;

  @Column({ type: 'varchar', name: 'typePay', nullable: false })
  typePay: string;

  @CreateDateColumn({ type: Date, name: 'createdAt', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: Date, name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.payment)
  orders: OrderEntity[];

  @ManyToOne(() => StatusEntity, (status) => status.payments)
  @JoinColumn({ name: 'statusId', referencedColumnName: 'id' })
  status: StatusEntity;
}
