import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async generateOrdFile(order: Order): Promise<string> {
    // Implement logic to generate .ord file based on the order
    // Return the file path or file content
    return 'file_content_or_path.ord';
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
