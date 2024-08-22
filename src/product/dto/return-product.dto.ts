import { ReturnCategoryDto } from "src/category/dto/return-category.dto";
import { ProductEntity } from "../entities/product.entity";

export class ReturnProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: ReturnCategoryDto;

    constructor(productEntity: ProductEntity) {
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.description = productEntity.description;
        this.price = productEntity.price;
        this.image = productEntity.image;
        this.category = productEntity.category ? new ReturnCategoryDto(productEntity.category) : undefined;
    }
}