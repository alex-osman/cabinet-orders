import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Cabinet } from './cabinet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cabinet])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
