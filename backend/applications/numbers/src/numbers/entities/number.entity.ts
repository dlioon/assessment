import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { NumberStatus } from '../constants/number.constants';
import { NumberUser } from './number-user.entity';

@Entity('numbers')
export class Number {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ type: 'int', nullable: false })
  number: number;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  status: NumberStatus;

  @OneToMany(() => NumberUser, (numberUser) => numberUser.number)
  numberUsers: NumberUser[];
}
