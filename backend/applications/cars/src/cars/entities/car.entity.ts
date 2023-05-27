import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ type: 'varchar', nullable: false })
  make: string;

  @Column({ type: 'varchar', nullable: false })
  model: string;

  @Column({ type: 'int', nullable: false })
  price: number;
}
