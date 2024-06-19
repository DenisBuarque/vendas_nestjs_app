import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from './cart-product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';

const listCarts = [
  {
    id: 1,
    active: true,
    createdAt: "2024-06-19T12:55:08.717Z",
    updatedAt: "2024-06-19T12:55:08.717Z",
    userId: 3,
  }
];

const listCartProducts = [
  {
    id: 1,
    amount: 2,
    createAd: "2024-06-19T12:57:03.140Z",
    updatedAt: "2024-06-19T13:36:54.000Z",
    cartId: 3,
    productId: 1,
  },
  {
    id: 1,
    amount: 2,
    createAd: "2024-06-19T12:57:03.140Z",
    updatedAt: "2024-06-19T13:36:54.000Z",
    cartId: 3,
    productId: 2,
  }
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
  let productService: ProductService;
  let repository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: ProductService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(listProducts[0]),
          },
        },{
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn().mockResolvedValue(listCartProducts[0]),
          }
        }
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

  describe('deleteProductCart', () => {
    it('should return delete result', async () => {
      const result = await service.deleteProductCart(listProducts[0].id, listCartProducts[0].id);
      expect(result).toEqual(listCartProducts[0]);
    });

    it('should return error delete', async () => {
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(() => {
        throw new Error('Error delete cart product');
      });
      await expect(repository.delete).rejects.toThrow('Error delete');
    });
  });
  
});
