import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderPaymentDTO } from './dto/create-order-payment.dto';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { ProductService } from 'src/product/product.service';
import { ReturnOrderDTO } from './dto/return-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}

  async findAllOrders(): Promise<ReturnOrderDTO[]> {
    const orders = (
      await this.orderRepository.find({
        relations: {
          user: true,
        },
      })
    ).map((order) => new ReturnOrderDTO(order));

    if (!orders || orders.length === 0) {
      throw new NotFoundException('orders not found.');
    }

    return orders;
  }

  async createOrder(
    data: CreateOrderPaymentDTO,
    userId: number,
  ): Promise<OrderEntity> {
    const cart = await this.cartService.findOne(userId);

    const products = await this.productService.findProductById(
      cart.cartProducts.map((cartProduct) => cartProduct.productId),
    );

    const payment: PaymentEntity = await this.paymentService.createPayment(
      data,
      products,
      cart,
    );

    const order = await this.orderRepository.save({
      userId: userId,
      addressId: data.addressId,
      currentDate: new Date(),
      paymentId: payment.id,
    });

    await Promise.all(
      cart.cartProducts?.map((cartProduct) => {
        this.orderProductService.createOrderProduct(
          cartProduct.productId,
          order.id,
          products.find((product) => product.id === cartProduct.productId)
            ?.price || 0,
          cartProduct.amount,
        );
      }),
    );

    //await this.cartService.clearCart(userId);

    return order;
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
        address: true,
        payment: true,
        orderProduct: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found.');

    return order;
  }

  async findOrdersByUser(userId: number): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      where: {
        userId,
      },
      relations: {
        address: true,
        orderProduct: {
          product: true,
        },
        payment: true,
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Orders not found!');
    }

    return orders;
  }
}
