import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderPaymentDTO } from './dto/create-order-payment.dto';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService
  ) {}

  async createOrder(data: CreateOrderPaymentDTO, userId: number): Promise<OrderEntity> {
    const payment: PaymentEntity =
      await this.paymentService.createPayment(data);

    const order = await this.orderRepository.save({
      userId: userId,
      addressId: data.addressId,
      currentDate: new Date(),
      paymentId: payment.id,
    });

    const cart = await this.cartService.findOne(userId);

    const products = await this.productService.findProductById(
      cart.cartProducts.map((cartProduct) => cartProduct.productId),
    )

    await Promise.all(
      cart.cartProducts?.map((cartProduct) => {
        this.orderProductService.createOrderProduct(
          cartProduct.id,
          order.id,
          products.find((product) => product.id === cartProduct.productId)?.price || 0,
          cartProduct.amount,
        );
      }),
    );

    return order;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
