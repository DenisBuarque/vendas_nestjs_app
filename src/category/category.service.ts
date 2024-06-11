import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.save(data);
    } catch (error) {
      throw new BadRequestException('Something bad happened');
    }
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const user = await this.categoryRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Category not found!');
    return user;
  }

  async update(id: number, data: UpdateCategoryDto): Promise<CategoryEntity> {
    await this.findOne(id);
    try {
      await this.categoryRepository.update(id, data);
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro update category data!');
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Erro deleting category!');
    }
  }
}
