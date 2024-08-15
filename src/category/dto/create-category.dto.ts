import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from "class-validator";
import { CategoryEntity } from "../entities/category.entity";
import { Unique } from "typeorm";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @Validate(Unique, [CategoryEntity, 'name'])
    readonly name: string;

    @IsDate()
    @IsOptional()
    readonly createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
