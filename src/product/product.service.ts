import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@UseGuards(AuthGuard, RolesGuard)
@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ){}

  @Roles(Role.Admin)
  async create(data: CreateProductDto): Promise<ProductEntity> {
    try {
      return await this.productRepository.save(data);
    } catch (error) {
      throw new BadRequestException('Error add Product data!');
    }
  }

  @Roles(Role.Admin)
  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({ order: { id: "DESC"}, relations: { category: true}});
  }


  @Roles(Role.Admin)
  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: {id}, relations: { category: true}});
    if(!product) throw new NotFoundException('Produto not found!');
    return product;
  }

  @Roles(Role.Admin)
  async update(id: number, data: UpdateProductDto): Promise<ProductEntity> {
    await this.findOne(id);
    try {
      const product = await this.productRepository.update(id, data);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro update product data!');
    }
  }

  @Roles(Role.Admin)
  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Erro deleting product!');
    }
  }
}
