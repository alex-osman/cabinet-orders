import { Controller, Post, Body, Res, Get, Param, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    const order = await this.ordersService.create(createOrderDto);
    const ordFile = await this.ordersService.generateOrdFileFromOrderId(order.id);

    // Send .ord file as response for download
    res.setHeader('Content-Disposition', 'attachment; filename=order.ord');
    res.setHeader('Content-Type', 'text/plain');
    res.send(ordFile);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Post(':orderId/generate-ord')
  async generateOrdFile(@Param('orderId') orderId: number, @Res() res: Response): Promise<void> {
    try {
      const fileName = await this.ordersService.generateOrdFileFromOrderId(orderId);
      res.status(HttpStatus.OK).json({ message: `File ${fileName} created successfully.`, path: fileName });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error generating file', error: error.message });
    }
  }
}
