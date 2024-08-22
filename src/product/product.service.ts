import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(data: CreateProductDto): Promise<CreateProductDto> {
    const product = await this.productRepository.findOne({
      where: { name: data.name },
    });
    if (product)
      throw new BadRequestException(
        'Product registered in the system, please add another product.',
      );
    return await this.productRepository.save(data);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found.');
    return product;
  }

  async getProductByCategory(id: number): Promise<ProductEntity[]> {

    await this.categoryService.findOne(id);

    const products = await this.productRepository.find({
      where: { categoryId: id },
      relations: { category: true },
    });
    if (!products)
      throw new NotFoundException(
        `Sorry, not exist products with category ${id}.`,
      );
    return products;
  }

  async update(id: number, data: UpdateProductDto): Promise<UpdateResult> {
    await this.findOne(id);
    data.updatedAt = new Date();
    return await this.productRepository.update(id, data);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.productRepository.delete(id);
  }
}
