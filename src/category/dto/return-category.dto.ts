import { CategoryEntity } from "../entities/category.entity";

export class ReturnCategoryDto {
    id: number;
    name: string;

    constructor(returnCategory: CategoryEntity){
        this.id = returnCategory.id;
        this.name = returnCategory.name;
    }
}