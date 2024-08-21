import { ProductEntity } from "../entities/product.entity";

export class ReturnProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;

    constructor(productEntity: ProductEntity) {
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.description = productEntity.description;
        this.price = productEntity.price;
        this.image = productEntity.image;
    }
}