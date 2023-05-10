import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Number } from './number.entity';

@Entity('numberUser')
export class NumberUser {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ type: 'int', nullable: false })
  numberId: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  userId: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  paymentId: string;

  @ManyToOne(() => Number, (number) => number.numberUsers)
  @JoinColumn({ name: 'numberId', referencedColumnName: 'id' })
  number: Number;
}
