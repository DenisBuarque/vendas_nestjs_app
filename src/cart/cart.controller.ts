import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';;
import { InsertCartDTO } from './dto/insert-cart.dto';
import { UserId } from '../decorators/userId.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult } from 'typeorm';
import { UpdateCartDto } from './dto/update-cart.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(Role.Admin, Role.User)
  @Get()
  async find(@UserId() userId: number): Promise<CartEntity[]> {
    return await this.cartService.find(userId);
  }

  @Roles(Role.Admin, Role.User)
  @Post()
  async createCart(@Body() data: InsertCartDTO, @UserId() userId: number) {
    return await this.cartService.insertProductInCart(data, userId);
  }

  @Roles(Role.Admin, Role.User)
  @Patch()
  async updateProductCart(@Body() data: UpdateCartDto, @UserId() userId: number): Promise<CartEntity> {
    return await this.cartService.updateProductCart(data, userId);
  }

  @Roles(Role.Admin, Role.User)
  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return await this.cartService.clearCart(userId);
  }

  @Roles(Role.Admin, Role.User)
  @Delete('/product/:id')
  async deleteProductCart(@Param('id') id: number, @UserId() userId: number): Promise<DeleteResult> {
    return await this.cartService.deleteProductCart(id, userId);
  }

}
