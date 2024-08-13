import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cabinet } from './cabinet.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @OneToMany(() => Cabinet, (cabinet) => cabinet.order, { cascade: true })
  cabinets: Cabinet[];
}
