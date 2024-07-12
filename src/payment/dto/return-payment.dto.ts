import { PaymentEntity } from "../entities/payment.entity"
import { CreateOrderDto } from "src/order/dto/create-order.dto"

export class ReturnPaymentDTO {
    id: number
    statusId: number
    price: number
    discount: number
    finalPrice: number
    typePay: string
    orders: CreateOrderDto;

    constructor(payment: PaymentEntity){
        this.id = payment.id;
        this.statusId = payment.statusId;
        this.price = payment.price;
        this.discount = payment.discount;
        this.finalPrice = payment.finalPrice;
        this.typePay = payment.typePay;
        this.orders = payment.orders ? new CreateOrderDto() : undefined;
    }
}