import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: CreateProductDto): Promise<ProductEntity> {
      return this.productService.create(data);
  }

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Get('category/:id')
  async productByCategory(@Param('id') id: number): Promise<ProductEntity[]> {
    return await this.productService.productByCategory(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto): Promise<ProductEntity> {
    return this.productService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.remove(+id);
  }
}
