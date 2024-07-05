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
import { ReturnCategoryDTO } from './dto/return-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.save(data);
    } catch (error) {
      throw new BadRequestException('Error add category.');
    }
  }

  async findAll(): Promise<ReturnCategoryDTO[]> {
    return (await this.categoryRepository.find()).map((category) => new ReturnCategoryDTO(category));
  }

  async findOne(id: number): Promise<ReturnCategoryDTO> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found!');
    return new ReturnCategoryDTO(category);
  }

  async update(id: number, data: UpdateCategoryDto): Promise<ReturnCategoryDTO> {
    await this.findOne(id);
    try {
      data.updatedAt = new Date();
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
