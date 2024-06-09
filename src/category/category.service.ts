import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

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
      throw new BadRequestException('Ocorreu um error ao realizar o cadastro!');
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

  async update(id: number, data: UpdateCategoryDto): Promise<UpdateResult> {
    await this.findOne(id);
    try {
      const user = await this.categoryRepository.update(id, data);
      return user;
    } catch (error) {
      throw new BadRequestException('Erro apdate category data!');
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
