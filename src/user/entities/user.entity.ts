import { CartEntity } from 'src/cart/entities/cart.entity';
import { AddressEntity } from '../../address/entities/address.entity';
import { Role } from '../../enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'integer', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'name', nullable: false, length: 50 })
  name: string;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: false,
    unique: true,
    length: 50,
  })
  email: string;

  @Column({ type: 'varchar', name: 'phone', nullable: false, length: 11 })
  phone: string;

  @Column({
    type: 'char',
    name: 'cpf',
    nullable: false,
    unique: true,
    length: 14,
  })
  cpf: string;

  @Column({ type: 'varchar', name: 'password', nullable: false, length: 255 })
  password: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @CreateDateColumn({ type: Date, name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: Date, name: 'updated_at' })
  updatedAt?: Date;

  // Relation
  @OneToMany(() => AddressEntity, (address) => address.user)
  adresses: AddressEntity[];

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;
}
