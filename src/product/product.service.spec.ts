import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from 'src/category/entities/category.entity';

const listProducts = [
  {
    id: 1,
    name: 'Produto',
    price: 10,
    description: 'Descrição do produto',
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Produto 2',
    price: 20,
    description: 'Descrição do produto',
    categoryId: 2,
  },
  {
    id: 3,
    name: 'Produto 3',
    price: 30,
    description: 'Descrição do produto',
    categoryId: 3,
  },
];

const listCategory: CategoryEntity[] = [
  {
    id: 1,
    name: 'Informática',
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
  },
  {
    id: 2,
    name: 'Limpeza',
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
  },
  {
    id: 3,
    name: 'Auto',
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [],
  },
];

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<ProductEntity>;
  let category: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        JwtService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            create: jest.fn().mockReturnValue(CreateProductDto),
            save: jest.fn().mockResolvedValue(listProducts[0]),
            findAll: jest.fn().mockResolvedValue(listProducts),
            find: jest.fn().mockResolvedValue(listProducts),
            findOne: jest.fn().mockResolvedValue(listProducts[0]),
            update: jest.fn().mockResolvedValue(listProducts[0]),
            remove: jest.fn().mockResolvedValue(ProductEntity),
            delete: jest.fn().mockResolvedValue(ProductEntity),
            productByCategory: jest.fn().mockResolvedValue(listProducts),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(listCategory[0]),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    category = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(category).toBeDefined();
  });

  describe('create', () => {
    it('Test: function create success', async () => {
      const data: CreateProductDto = {
        name: 'Produto',
        price: 10,
        description: 'Descrição do produto',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await service.create(data);
      expect(result).toEqual(listProducts[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('Test: Error BadRequestException create product', async () => {
      const data: CreateProductDto = {
        name: undefined,
        price: 10,
        description: 'Descrição do produto',
        categoryId: 1,
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

  describe('productByCategory', () => {
    it('Test: function productByCategory success', async () => {
      jest.spyOn(category, 'findOne').mockResolvedValue(listCategory[0]);
      const result = await service.productByCategory(listCategory[0].id);
      expect(result).toEqual(listProducts);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if category not found', async () => {
      jest.spyOn(category, 'findOne').mockResolvedValue(undefined);
      await expect(service.productByCategory(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('Test: function findAll success', async () => {
      const result = await service.findAll();
      expect(result).toEqual(listProducts);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('Test: function findAll error', async () => {
      // Espionando o método findOne e mockando sua implementação para lançar um erro
      jest.spyOn(repository, 'find').mockRejectedValueOnce(() => {
        throw new Error('Can not list products');
      });
      // Testando se a chamada de findOne com um ID inválido lança o erro esperado
      await expect(repository.find).rejects.toThrow('Can not list products');
    });
  });

  describe('findOne', () => {
    it('Test: function findOne success', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(listProducts[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Test: function findOne error', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(() => {
        throw new Error('Product not found');
      });
      await expect(service.findOne(undefined)).rejects.toThrow(
        'Product not found',
      );
    });
  });

  describe('update', () => {
    it('Test: function update success', async () => {
      const data: UpdateProductDto = {
        name: 'Produto',
        price: 10,
        description: 'Descrição do produto',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await service.update(1, data);
      expect(result).toEqual(listProducts[0]);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('Test: Error BadRequestException create category', async () => {
      const data: UpdateProductDto = {
        name: undefined,
        price: 10,
        description: 'Descrição do produto',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'update').mockRejectedValueOnce(new Error());

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
      expect(result).toEqual(ProductEntity);
    });

    it('Test: function delete error', async () => {
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(() => {
        throw new Error('Can not delete product');
      });
      await expect(repository.delete(undefined)).rejects.toThrow(
        'Can not delete product',
      );
    });
  });
});
