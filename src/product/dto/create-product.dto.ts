import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Validate } from "class-validator";
import { ProductEntity } from "../entities/product.entity";
import { Unique } from "typeorm";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @Validate(Unique, [ProductEntity, 'name'])
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    readonly price: string;

    @IsString()
    @IsOptional()
    readonly image?: string;

    @IsNumber()
    categoryId?: number;

    @IsDate()
    @IsOptional()
    readonly createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
