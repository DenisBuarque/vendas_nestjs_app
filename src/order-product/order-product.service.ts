import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { Repository } from 'typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderProductService {

  constructor(
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>
  ){}

  async createOrderProduct(productId: number, orderId: number, price: number, amount: number): Promise<OrderProductEntity> {
    return await this.orderProductRepository.save({productId, orderId, price, amount});
  }

  findAll() {
    return `This action returns all orderProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderProduct`;
  }
}
