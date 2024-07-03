import { ReturnUserDTO } from "src/user/dto/return-user.dto";
import { OrderEntity } from "../entities/order.entity"

export class ReturnOrderDTO {
    id: number
    currentDate: Date
    user?: ReturnUserDTO

    constructor(order: OrderEntity){
        this.id = order.id;
        this.currentDate = order.currentDate;
        this.user = order.user ? new ReturnUserDTO(order.user) : undefined;
    }
}