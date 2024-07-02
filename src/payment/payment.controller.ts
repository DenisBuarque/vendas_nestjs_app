import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentEntity } from './entities/payment.entity';
import { CreateOrderPaymentDTO } from 'src/order/dto/create-order-payment.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() data: CreateOrderPaymentDTO, products: ProductEntity[], cart: CartEntity): Promise<PaymentEntity> {
    return this.paymentService.createPayment(data, products, cart);
  }
}
