import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ReturnCategoryDto } from './dto/return-category.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateCategoryDto): Promise<CreateCategoryDto> {
    return await this.categoryService.create(data);
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  async findAll(): Promise<ReturnCategoryDto[]> {
    return await this.categoryService.findAll();
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return await this.categoryService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryService.update(id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.categoryService.remove(id);
  }
}
