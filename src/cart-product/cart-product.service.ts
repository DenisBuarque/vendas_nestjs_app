import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CartEntity } from '../cart/entities/cart.entity';
import { InsertCartDTO } from '../cart/dto/insert-cart.dto';
import { ProductService } from '../product/product.service';
import { UpdateCartDto } from '../cart/dto/update-cart.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService
  ) {}

  async verifyCartProduct(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: { productId, cartId },
    });
    if (!cartProduct) throw new NotFoundException('Cart product not found!');
    return cartProduct;
  }

  async createCartProduct (data: InsertCartDTO, cartId: number): Promise<CartProductEntity> {
    return await this.cartProductRepository.save({
      amount: data.amount,
      productId: data.productId,
      cartId
    });
  }

  async insertCartProduct (data: InsertCartDTO, cart: CartEntity): Promise<CartProductEntity> {

    await this.productService.findOne(data.productId);

    const cartProduct = await this.verifyCartProduct(data.productId, cart.id).catch(() => undefined);
    if (!cartProduct) {
      return this.createCartProduct(data, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: data.amount + data.amount
    });
  }

  async updateCartProduct (data: UpdateCartDto, cart: CartEntity): Promise<CartProductEntity> {

    await this.productService.findOne(data.productId);

    const cartProduct = await this.verifyCartProduct(data.productId, cart.id);

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: data.amount,
    });
  }

  async deleteProductCart(productId: number, cartId: number): Promise<DeleteResult> {
    return await this.cartProductRepository.delete({productId, cartId});
  }

}
