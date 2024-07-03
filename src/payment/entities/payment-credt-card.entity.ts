import { ChildEntity, Column, Entity } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentCredtCardEntity extends PaymentEntity {
  @Column({
    type: 'decimal',
    name: 'amountPayment',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  amountPayment?: number;
}
