import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ReturnProductDto } from './dto/return-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(data: CreateProductDto): Promise<CreateProductDto> {
    const product = await this.productRepository.findOne({ where: { name: data.name }});
    if (product) throw new BadRequestException('Product registered in the system, please add another product.')
    return await this.productRepository.save(data);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id }});
    if(!product) throw new NotFoundException("Product not found.");
    return product;
  }

  async getProductByCategory(id: number): Promise<ReturnProductDto[]> {
    const products = await this.productRepository.find({ where: { categoryId: id }});
    if(!products) throw new NotFoundException(`Sorry, not exist products with category ${id}.`)
    return products;
  }

  async update(id: number, data: UpdateProductDto): Promise<UpdateResult> {
    await this.findOne(id);
    data.updatedAt = new Date();
    return await this.productRepository.update(id, data);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id)
    return await this.productRepository.delete(id);
  }
}
