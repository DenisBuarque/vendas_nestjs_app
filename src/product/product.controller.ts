import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ReturnProductDto } from './dto/return-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseGuards(AuthGuard, RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.Admin, Role.User)
  @Post()
  async create(@Body() data: CreateProductDto): Promise<CreateProductDto> {
    return await this.productService.create(data);
  }

  @Get()
  async findAll(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAll()).map((product) => new ReturnProductDto(product));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new ReturnProductDto(await this.productService.findOne(id));
  }

  @Get('/category/:id')
  async getProductByCategory(@Param('id') id: number): Promise<ReturnProductDto[]> {
    return await this.productService.getProductByCategory(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateProductDto): Promise<UpdateResult> {
    return await this.productService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.productService.remove(+id);
  }
}
