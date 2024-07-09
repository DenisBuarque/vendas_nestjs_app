import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '..//enums/role.enum';
import { Roles } from '../decorators/role.decorator';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { ReturnProductDTO } from './dto/Return-product.dto';

@UseGuards(AuthGuard, RolesGuard)
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  @Roles(Role.Admin)
  async create(data: CreateProductDto): Promise<ProductEntity> {
    try {
      return await this.productRepository.save(data);
    } catch (error) {
      throw new BadRequestException('Error add Product data!');
    }
  }

  @Roles(Role.Admin)
  async findAll(): Promise<ReturnProductDTO[]> {
    return (
      await this.productRepository.find({
        order: { id: 'DESC' },
        relations: { 
          category: true,
          cartProducts: true,
          orderProduct: true,
         },
      })
    ).map((product) => new ReturnProductDTO(product));
  }

  @Roles(Role.Admin)
  async findProductById(productId: number[]) {
    const products = await this.productRepository.find({
      where: { id: In(productId) },
    });

    if (!products || products.length === 0) {
      throw new NotFoundException('Not found product!');
    }

    return products;
  }

  @Roles(Role.Admin)
  async productByCategory(id: number): Promise<ProductEntity[]> {
    const category = await this.categoryService.findOne(id);
    if (!category) throw new NotFoundException('Category not found!');
    return await this.productRepository.find({ where: { categoryId: id } });
  }

  @Roles(Role.Admin)
  async findOne(id: number): Promise<ReturnProductDTO> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) throw new NotFoundException('Produto not found!');
    return new ReturnProductDTO(product);
  }

  @Roles(Role.Admin)
  async update(id: number, data: UpdateProductDto): Promise<ReturnProductDTO> {
    await this.findOne(id);
    try {
      await this.productRepository.update(id, data);
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
