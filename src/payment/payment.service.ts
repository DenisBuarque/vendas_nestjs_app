import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderPaymentDTO } from 'src/order/dto/create-order-payment.dto';
import { Status } from 'src/enums/status.enum';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repositoyPayment: Repository<PaymentEntity>,
  ) {}

  async createPayment(
    data: CreateOrderPaymentDTO,
    products: ProductEntity[],
    cart: CartEntity,
  ): Promise<PaymentEntity> {
    const finalPrice = cart.cartProducts
      ?.map((cartProduct) => {
        const product = products.find(
          (product) => product.id === cartProduct.productId,
        );
        if (product) {
          return cartProduct.amount * product.price;
        }

        return 0;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (data.amountPayment) {
      const paymentCredtCard = {
        statusId: Status.Done,
        price: finalPrice,
        discount: 0,
        finalPrice: finalPrice,
        typePay: 'payment-credt-card',
        amountPayment: data.amountPayment,
      };
      return await this.repositoyPayment.save(paymentCredtCard);
    } else if (data.code && data.datePayment) {
      const paymentPix = {
        statusId: Status.Done,
        price: finalPrice,
        discount: 0,
        finalPrice: finalPrice,
        typePay: 'payment-pix',
        code: data.code,
        datePayment: data.datePayment,
      };
      return await this.repositoyPayment.save(paymentPix);
    }

    throw new BadRequestException(
      'Amount Payment or code and date payment not fount.',
    );
  }
}
