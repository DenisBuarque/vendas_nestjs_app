import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCartDTO } from './dto/insert-cart.dto';
import { CartProductService } from '../cart-product/cart-product.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async findOne(userId: number): Promise<CartEntity> {
    return await this.cartRepository.findOne({
      where: { userId },
      relations: {
        cartProducts: {
          product: true,
        },
      },
    });
  }

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.verifyCartActive(userId);

    await this.cartRepository.save({
      ...cart,
      active: false,
    });

    return {
      raw: [],
      affected: 1, //line affected
    };
  }

  async verifyCartActive(userId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: { userId, active: true },
      relations: {
        cartProducts: {
          product: true,
        },
      },
    });
    if (!cart) throw new NotFoundException('Cart not found!');

    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return await this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async insertProductInCart(
    data: InsertCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.verifyCartActive(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertCartProduct(data, cart);

    return cart;
  }

  async updateProductCart(
    data: UpdateCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.verifyCartActive(userId).catch(async () => {
      return this.createCart(userId);
    });
    await this.cartProductService.updateCartProduct(data, cart);

    return cart;
  }

  async deleteProductCart(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart = await this.verifyCartActive(userId);
    return await this.cartProductService.deleteCartProduct(productId, cart.id);
  }
}
