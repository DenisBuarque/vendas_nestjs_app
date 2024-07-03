import { AddressEntity } from '../../address/entities/address.entity';
import { StateEntity } from '../../state/entities/state.entity';
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

@Entity({ name: 'cities' })
export class CityEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ type: 'number', name: 'stateId' })
  stateId: number;

  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn()
  state: StateEntity;

  @OneToMany(() => AddressEntity, (address) => address.city)
  adresses: AddressEntity[];

  @CreateDateColumn({ type: Date, name: 'createdAt', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: Date, name: 'updatedAt', nullable: true })
  updatedAt?: Date;
}
