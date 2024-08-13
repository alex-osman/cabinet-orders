import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { ConfigurationType } from './dto/configuration-type.enum';
import { StyleType } from './dto/style-type.enum';

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
  configurationType: ConfigurationType;

  @Column()
  style: StyleType;

  @ManyToOne(() => Order, (order) => order.cabinets)
  order: Order;
}
