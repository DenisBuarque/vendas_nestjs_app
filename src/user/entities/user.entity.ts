import { CartEntity } from '../../cart/entities/cart.entity';
import { AddressEntity } from '../../address/entities/address.entity';
import { Role } from '../../enums/role.enum';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'name', length: 50, nullable: false })
  name: string;

  @Column({ type: 'char', name: 'phone', length: 11, nullable: false })
  phone: string;

  @Column({
    type: 'char',
    name: 'cpf',
    length: 14,
    nullable: false,
    unique: true,
  })
  cpf: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', name: 'password', length: 255, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @CreateDateColumn({ type: Date, name: 'createdAt', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: Date, name: 'createdAd', nullable: true })
  updatedAt: Date;

  @OneToOne(() => AddressEntity, (address) => address.user)
  address: AddressEntity;

  //@OneToMany(type => ProdutoEntity, produto => produto.usuario, { onDelete: 'CASCADE' })
  //produtos: ProdutoEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
