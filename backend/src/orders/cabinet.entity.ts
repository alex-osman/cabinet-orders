import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Cabinet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  width: number;

  @Column('float')
  height: number;

  @Column('float')
  depth: number;

  @Column()
  configurationType: string; // e.g., '3_drawer', '2_drawer', 'door', 'door_false_front'

  @Column({ nullable: true })
  drawerCount?: number;

  @Column({ nullable: true })
  doorType?: string;

  @ManyToOne(() => Order, (order) => order.cabinets)
  order: Order;
}
