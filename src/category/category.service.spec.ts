import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';

const listCategories = [
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

  describe('create', () => {
    it('Test: function create success', async () => {
      const data: CreateCategoryDto = {
        name: 'Informática',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await service.create(data);
      expect(result).toEqual(listCategories[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Test: Error BadRequestException create category', async () => {
      const data: CreateCategoryDto = {
        name: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      try {
        await service.create(data);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findAll', () => {
    it('Test: function findAll success', async () => {
      const result = await service.findAll();
      expect(result).toEqual(listCategories);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('Test: function findAll error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('Can not list categories');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(repository.find).rejects.toThrow('Can not list categories');
    });
  });

  describe('findOne', () => {
    it('Test: function findOne success', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(listCategories[0]);
      //Obriga a função findOne se executada pelomentos uma vez.
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Test: function findOne error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(() => {
        throw new Error('Category not found');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(service.findOne(undefined)).rejects.toThrow(
        'Category not found',
      );
    });
  });

  describe('update', () => {
    it('Test: function update success', async () => {
      const data: UpdateCategoryDto = {
        name: 'Movie',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await service.update(1, data);
      expect(result).toEqual(listCategories[0]);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('Test: Error BadRequestException create category', async () => {
      const data: UpdateCategoryDto = {
        name: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    it('Test: function delete success', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(CategoryEntity);
    });

    it('Test: function delete error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(() => {
        throw new Error('Can not delete category');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(repository.delete(undefined)).rejects.toThrow(
        'Can not delete category',
      );
    });
  });
});
