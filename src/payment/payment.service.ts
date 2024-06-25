import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderPaymentDTO } from 'src/order/dto/create-order-payment.dto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repositoyPayment: Repository<PaymentEntity>,
  ) {}

  async createPayment(data: CreateOrderPaymentDTO): Promise<PaymentEntity> {

    if (data.amountPayment) {
      const paymentCredtCard = {
        statusId: Status.Done,
        price: 0,
        discount: 0,
        finalPrice: 0,
        typePay: "payment-credt-card",
        amountPayment: data.amountPayment,
      };
      return await this.repositoyPayment.save(paymentCredtCard);
    } else if (data.code && data.datePayment) {
      const paymentPix = {
        statusId: Status.Done,
        price: 0,
        discount: 0,
        finalPrice: 0,
        typePay: "payment-pix",
        code: data.code,
        datePayment: data.datePayment,
      };
      return await this.repositoyPayment.save(paymentPix);
    }

    throw new BadRequestException(
      'Amount Payment or code and date payment not fount.',
    );
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
