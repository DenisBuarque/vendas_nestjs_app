import { ReturnUserDTO } from "src/user/dto/return-user.dto";
import { OrderEntity } from "../entities/order.entity"
import { ReturnAddressDTO } from "src/address/dto/return-address.dto";
import { ReturnProductDTO } from "src/product/dto/Return-product.dto";
import { ReturnPaymentDTO } from "src/payment/dto/return-payment.dto";
import { ReturnOrderProducts } from "src/order-product/dto/return-order-product.dto";

export class ReturnOrderDTO {
    id: number
    currentDate: Date
    userId: number
    addressId: number
    paymentId: number
    user?: ReturnUserDTO
    address?: ReturnAddressDTO
    payment?: ReturnPaymentDTO
    orderProduct?: ReturnOrderProducts[];

    constructor(order: OrderEntity){
        this.id = order.id;
        this.currentDate = order.currentDate;
        this.userId = order.userId;
        this.addressId = order.addressId;
        this.paymentId = order.paymentId;
        this.user = order.user ? new ReturnUserDTO(order.user) : undefined;
        this.address = order.address ? new ReturnAddressDTO(order.address) : undefined;
        this.payment = order.payment ? new ReturnPaymentDTO(order.payment) : undefined;
        this.orderProduct = order.orderProduct ? order.orderProduct.map((orderProduct) => new ReturnOrderProducts(orderProduct),) : undefined;
    }
}