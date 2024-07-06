import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReturnCategoryDTO } from './dto/return-category.dto';

const listCategories: ReturnCategoryDTO[] = [
  { id: 1, name: 'Informática' },
  { id: 2, name: 'Móveis' },
  { id: 3, name: 'Livros' },
];

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            create: jest.fn().mockReturnValue(CreateCategoryDto),
            save: jest.fn().mockResolvedValue(listCategories[0]),
            findAll: jest.fn().mockResolvedValue(listCategories),
            find: jest.fn().mockResolvedValue(listCategories),
            findOne: jest.fn().mockResolvedValue(listCategories[0]),
            update: jest.fn().mockResolvedValue(listCategories[0]),
            remove: jest.fn().mockResolvedValue(CategoryEntity),
            delete: jest.fn().mockResolvedValue(CategoryEntity),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should retunr all caterios', async () => {
      const result = await service.findAll();
      expect(result).toEqual(listCategories);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return error findAll', async () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('Can not list categories');
      });
      await expect(repository.find).rejects.toThrow('Can not list categories');
    });
  });

  describe('create', () => {
    it('should return add new category', async () => {
      const data: ReturnCategoryDTO = {
        id: 1,
        name: 'Informática',
      };
      const result = await service.create(data);
      expect(result).toEqual(listCategories[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should return error add new category', async () => {
      const data: ReturnCategoryDTO = {
        id: 1,
        name: undefined,
      };
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());
      try {
        await service.create(data);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findOne', () => {
    it('should return show category', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(listCategories[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return error show category', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(() => {
        throw new Error('Error category not found');
      });
      await expect(service.findOne(undefined)).rejects.toThrow(
        'Error category not found',
      );
    });
  });

  describe('update', () => {
    it('should return update category', async () => {
      const data: ReturnCategoryDTO = {
        id: 1,
        name: 'Movie',
      };

      const result = await service.update(1, data);
      expect(result).toEqual(listCategories[0]);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should return error update category', async () => {
      const data: ReturnCategoryDTO = {
        id: 1,
        name: undefined,
      };

      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      try {
        await service.update(1, data);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('delete', () => {
    it('should return delete category', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(CategoryEntity);
    });

    it('should return error delete category', async () => {
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(() => {
        throw new Error('Error delete category');
      });

      try {
        await expect(repository.delete(undefined)).rejects.toThrow(
          'Error delete category',
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
