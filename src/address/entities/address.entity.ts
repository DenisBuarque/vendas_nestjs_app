import { OrderEntity } from 'src/order/entities/order.entity';
import { CityEntity } from '../../city/entities/city.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'adresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ type: 'char', name: 'zip_code', length: 9, nullable: false })
  zip_code: string;

  @Column({ type: 'varchar', name: 'address', length: 100, nullable: false })
  address: string;

  @Column({
    type: 'varchar',
    name: 'numberAddress',
    length: 10,
    nullable: false,
  })
  numberAddress: string;

  @Column({ type: 'varchar', name: 'district', length: 50, nullable: false })
  district: string;

  @CreateDateColumn({ type: Date, name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: Date, name: 'updatedAt' })
  updatedAt: Date;

  @Column({ type: 'number', name: 'userId' })
  userId?: number;

  @OneToOne(() => UserEntity, (user) => user.address)
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'number', name: 'cityId' })
  cityId: number;

  @ManyToOne(() => CityEntity, (city) => city.adresses)
  @JoinColumn()
  city: CityEntity;

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders: OrderEntity[];
}
