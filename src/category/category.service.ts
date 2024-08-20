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
import { ReturnCategoryDto } from './dto/return-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(data: CreateCategoryDto): Promise<CreateCategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: { name: data.name },
    });
    if (category)
      throw new BadRequestException('Category exist, add new category.');
    return this.categoryRepository.save(data);
  }

  async findAll(): Promise<ReturnCategoryDto[]> {
    const categories = await this.categoryRepository.find();
    if (!categories)
      throw new NotFoundException('List category this empty, add a category.');
    return categories;
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found.');
    return category;
  }

  async update(id: number, data: UpdateCategoryDto): Promise<UpdateResult> {
    await this.findOne(id);
    data.updatedAt = new Date();
    return await this.categoryRepository.update(id, data);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.categoryRepository.delete(id);
  }
}
