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
import { UserId } from 'src/decorators/userId.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(Role.Admin, Role.User)
  @Post()
  async createCart(@Body() data: InsertCartDTO, @UserId() userId: number) {
    return await this.cartService.insertProductInCart(data, userId);
  }

}