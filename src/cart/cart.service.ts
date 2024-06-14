import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from './dto/insert-cart.dto';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>
  ){}

  async verifyCartExist (userId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({ where: { userId }});
    if(!cart) throw new NotFoundException('Cart not found!');

    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return await this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async insertProductInCart(data: InsertCartDTO, userId: number): Promise<CartEntity> {
    const cart = await this.verifyCartExist(userId).catch( async () => {
      return this.createCart(userId);
    });

    return cart;
  }

  /*
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
  */
}
