import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateOrderPaymentDTO } from './dto/create-order-payment.dto';
import { UserId } from 'src/decorators/userId.decorator';
import { OrderEntity } from './entities/order.entity';
import { ReturnOrderDTO } from './dto/return-order.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.Admin)
  @Get("/list")
  async findAllOrders(): Promise<ReturnOrderDTO[]> {
    return this.orderService.findAllOrders();
  }

  @Roles(Role.Admin, Role.User)
  @Post()
  async createOrder(
    @Body() data: CreateOrderPaymentDTO,
    @UserId() userId: number,
  ) {
    return await this.orderService.createOrder(data, userId);
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  async findOrdersByUser(@UserId() userId: number): Promise<OrderEntity[]> {
    return await this.orderService.findOrdersByUser(userId);
  }
}
