import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';
import { Order } from './order.entity';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    const order = await this.ordersService.create(createOrderDto);
    const ordFile = await this.ordersService.generateOrdFile(order);

    // Send .ord file as response for download
    res.setHeader('Content-Disposition', 'attachment; filename=order.ord');
    res.setHeader('Content-Type', 'text/plain');
    res.send(ordFile);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
  
  @Get("test")
  async addOrder() {
    return this.ordersService.create({
      width: 10,
      height: 20,
      depth: 30,
      style: "modern",
    });
  }
}
