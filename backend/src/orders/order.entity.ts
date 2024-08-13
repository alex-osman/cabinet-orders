import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  width: number;

  @Column('float')
  height: number;

  @Column('float')
  depth: number;

  @Column()
  style: string;
}
