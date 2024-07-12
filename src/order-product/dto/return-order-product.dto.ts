import { OrderProductEntity } from "../entities/order-product.entity"

export class ReturnOrderProducts {
    orderId: number
    productId: number
    price: number

    constructor(orderProduct: OrderProductEntity) {
        this.orderId = orderProduct.orderId;
        this.productId = orderProduct.productId;
        this.price = orderProduct.price;
    }

}