import { CreateCartProductDto } from "../../cart-product/dto/create-cart-product.dto";
import { ProductEntity } from "../entities/product.entity";
import { CreateOrderDto } from "../../order/dto/create-order.dto";
import { ReturnCategoryDTO } from "../../category/dto/return-category.dto";

export class ReturnProductDTO {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: ReturnCategoryDTO;
    cartProducts?: CreateCartProductDto;
    orderProduct?: CreateOrderDto;

     constructor(product: ProductEntity){
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.image = product.image;
        this.category = product.category ? new ReturnCategoryDTO(product.category) : undefined;
        this.cartProducts = product.cartProducts ? new CreateCartProductDto() : undefined;
        this.orderProduct = product.orderProduct ? new CreateOrderDto() : undefined;
     }
}