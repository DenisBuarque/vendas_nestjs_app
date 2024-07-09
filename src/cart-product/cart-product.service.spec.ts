import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from './cart-product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const listCarts = [
  {
    id: 1,
    active: true,
    createdAt: '2024-06-19T12:55:08.717Z',
    updatedAt: '2024-06-19T12:55:08.717Z',
    userId: 3,
  },
];

const listCartProducts = [
  {
    id: 1,
    amount: 2,
    createAd: '2024-06-19T12:57:03.140Z',
    updatedAt: '2024-06-19T13:36:54.000Z',
    cartId: 3,
    productId: 1,
  },
  {
    id: 1,
    amount: 2,
    createAd: '2024-06-19T12:57:03.140Z',
    updatedAt: '2024-06-19T13:36:54.000Z',
    cartId: 3,
    productId: 2,
  },
];

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

describe('CartProductService', () => {
  let service: CartProductService;
  let repository: Repository<CartProductEntity>;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            insertCartProduct: jest.fn().mockResolvedValue(listProducts[0]),
            findOne: jest.fn().mockResolvedValue(listCartProducts[0]),
            save: jest.fn().mockResolvedValue(listCartProducts[0]),
            delete: jest.fn().mockResolvedValue(listCartProducts[0]),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(listProducts[0]),
          },
        },
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    repository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createCartProduct', () => {
    it('should add new cart product data', async () => {
      const data = {
        amount: 1,
        createAd: new Date(),
        updatedAt: new Date(),
        cartId: 3,
        productId: 1,
      };

      const cartId = 1;
      const result = await service.createCartProduct(
        {
          amount: data.amount,
          productId: data.productId,
        },
        cartId,
      );

      expect(result).toEqual(listCartProducts[0]);
    });

    it('should return error when add new cart producto data', async () => {
      const data = {
        amount: 1,
        createAd: new Date(),
        updatedAt: new Date(),
        cartId: 3,
        productId: 1,
      };

      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      try {
        await service.createCartProduct(data, undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findOne', () => {
    it('should result findone cartProduto', async () => {
      const result = await service.verifyCartProduct(
        listCartProducts[0].id,
        listCarts[0].id,
      );
      expect(result).toEqual(listCartProducts[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException findOne cart product error', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      await expect(
        service.verifyCartProduct(listCartProducts[0].id, undefined),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCartProduct', () => {
    it('should return delete cart product data', async () => {
      const result = await service.deleteCartProduct(
        listProducts[0].id,
        listCartProducts[0].id,
      );
      expect(result).toEqual(listCartProducts[0]);
    });

    it('should return error when delete cart product data', async () => {
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(() => {
        throw new Error('Error delete cart product');
      });
      await expect(repository.delete).rejects.toThrow('Error delete cart product');
    });
  });
});
