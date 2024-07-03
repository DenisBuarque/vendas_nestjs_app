import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ type: 'int', name: 'code', nullable: true })
  code?: number;

  @Column({ type: Date, name: 'datePayment', nullable: true })
  datePayment?: Date;
}
