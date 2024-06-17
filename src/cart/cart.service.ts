import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from './dto/insert-cart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService
  ){}

  async verifyCartActive (userId: number): Promise<CartEntity> {
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
    const cart = await this.verifyCartActive(userId).catch( async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertCartProduct(data, cart);

    return cart;
  }

}